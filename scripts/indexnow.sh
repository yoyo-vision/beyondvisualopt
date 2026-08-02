#!/bin/bash
# IndexNow 主動通知腳本
#
# 什麼是 IndexNow：內容更新後主動通知搜尋引擎來爬，不用等它自己排到你。
# 吃這個協定的：Bing、Yandex、Seznam、Naver。
# ⚠️ Google 不支援 IndexNow，Google 那邊仍走 GSC 送審與自然重爬。
#
# 用法：
#   ./scripts/indexnow.sh                          # 送出 sitemap 裡的全部網址
#   ./scripts/indexnow.sh /blog/glasses-dizzy/ /lenses/   # 只送指定路徑
#
# 金鑰檔必須公開可讀（這是協定要求的擁有權證明，不是機密）：
#   https://beyondvisualopt.com/<KEY>.txt 內容 = <KEY> 本身

set -e
KEY="fb585d6711574b3a9dfeb3d65bebdf46"
HOST="beyondvisualopt.com"
KEY_LOCATION="https://${HOST}/${KEY}.txt"

# 送出前先確認金鑰檔線上讀得到，否則 IndexNow 會整批拒收
if ! curl -sf "$KEY_LOCATION" | grep -q "$KEY"; then
  echo "❌ 金鑰檔尚未上線或內容不符：$KEY_LOCATION"
  echo "   請先 git push 讓 public/${KEY}.txt 部署出去，再跑這支腳本。"
  exit 1
fi

if [ $# -gt 0 ]; then
  # 指定路徑模式
  URLS=$(printf '"https://%s%s",' "$HOST" "$@" | sed 's/,$//')
else
  # 全站模式：從 sitemap 撈
  URLS=$(curl -s "https://${HOST}/sitemap-0.xml" \
    | grep -o '<loc>[^<]*</loc>' | sed 's/<\/\?loc>//g' \
    | sed 's/.*/"&",/' | tr -d '\n' | sed 's/,$//')
fi

COUNT=$(echo "$URLS" | tr ',' '\n' | wc -l | tr -d ' ')
echo "準備送出 ${COUNT} 個網址…"

RESP=$(curl -s -w "\n%{http_code}" -X POST "https://api.indexnow.org/indexnow" \
  -H "Content-Type: application/json; charset=utf-8" \
  -d "{\"host\":\"${HOST}\",\"key\":\"${KEY}\",\"keyLocation\":\"${KEY_LOCATION}\",\"urlList\":[${URLS}]}")

CODE=$(echo "$RESP" | tail -1)
case "$CODE" in
  200|202) echo "✅ 已送出（HTTP $CODE）。202 = 已收下待驗證金鑰，正常。" ;;
  400) echo "❌ 400 格式錯誤" ;;
  403) echo "❌ 403 金鑰驗證失敗——檢查 $KEY_LOCATION 是否可公開讀取" ;;
  422) echo "❌ 422 網址與 host 不符" ;;
  429) echo "⚠️ 429 送太頻繁，等一下再試" ;;
  *)   echo "⚠️ 非預期回應 HTTP $CODE：$(echo "$RESP" | head -n -1)" ;;
esac

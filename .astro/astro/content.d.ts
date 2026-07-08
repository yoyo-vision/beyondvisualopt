declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"blog": {
"astigmatism-glasses-distortion.md": {
	id: "astigmatism-glasses-distortion.md";
  slug: "astigmatism-glasses-distortion";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"banqiao-glasses-guide.md": {
	id: "banqiao-glasses-guide.md";
  slug: "banqiao-glasses-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"banqiao-progressive-lens-guide.md": {
	id: "banqiao-progressive-lens-guide.md";
  slug: "banqiao-progressive-lens-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"banqiao-zeiss-lens-guide.md": {
	id: "banqiao-zeiss-lens-guide.md";
  slug: "banqiao-zeiss-lens-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"children-frames-guide.md": {
	id: "children-frames-guide.md";
  slug: "children-frames-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"children-myopia-tracking-xinzhuang.md": {
	id: "children-myopia-tracking-xinzhuang.md";
  slug: "children-myopia-tracking-xinzhuang";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"common-optometry-mistakes.md": {
	id: "common-optometry-mistakes.md";
  slug: "common-optometry-mistakes";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"contact-lens-fatigue.md": {
	id: "contact-lens-fatigue.md";
  slug: "contact-lens-fatigue";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"contact-lens-vs-glasses.md": {
	id: "contact-lens-vs-glasses.md";
  slug: "contact-lens-vs-glasses";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"digital-eye-strain-solution.md": {
	id: "digital-eye-strain-solution.md";
  slug: "digital-eye-strain-solution";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"driving-lens-night-glare.md": {
	id: "driving-lens-night-glare.md";
  slug: "driving-lens-night-glare";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"essilor-lens-guide.md": {
	id: "essilor-lens-guide.md";
  slug: "essilor-lens-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"frame-adjustment-handcraft.md": {
	id: "frame-adjustment-handcraft.md";
  slug: "frame-adjustment-handcraft";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"frame-face-shape.md": {
	id: "frame-face-shape.md";
  slug: "frame-face-shape";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"frame-fit-size.md": {
	id: "frame-fit-size.md";
  slug: "frame-fit-size";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"frame-material-guide.md": {
	id: "frame-material-guide.md";
  slug: "frame-material-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"glasses-dizzy.md": {
	id: "glasses-dizzy.md";
  slug: "glasses-dizzy";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"glasses-uncomfortable-3-reasons.md": {
	id: "glasses-uncomfortable-3-reasons.md";
  slug: "glasses-uncomfortable-3-reasons";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"high-myopia-glasses-guide.md": {
	id: "high-myopia-glasses-guide.md";
  slug: "high-myopia-glasses-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"hoya-lens-guide.md": {
	id: "hoya-lens-guide.md";
  slug: "hoya-lens-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"lens-coating-guide.md": {
	id: "lens-coating-guide.md";
  slug: "lens-coating-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"luxury-frame-lens-guide.md": {
	id: "luxury-frame-lens-guide.md";
  slug: "luxury-frame-lens-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"minamoto-eyewear-brand.md": {
	id: "minamoto-eyewear-brand.md";
  slug: "minamoto-eyewear-brand";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"myopia-getting-worse-truth.md": {
	id: "myopia-getting-worse-truth.md";
  slug: "myopia-getting-worse-truth";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"optometry-vs-ophthalmology.md": {
	id: "optometry-vs-ophthalmology.md";
  slug: "optometry-vs-ophthalmology";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"photochromic-sunglasses-guide.md": {
	id: "photochromic-sunglasses-guide.md";
  slug: "photochromic-sunglasses-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"presbyopia-lens-guide.md": {
	id: "presbyopia-lens-guide.md";
  slug: "presbyopia-lens-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"presbyopia-vs-progressive.md": {
	id: "presbyopia-vs-progressive.md";
  slug: "presbyopia-vs-progressive";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"progressive-lens-adaptation.md": {
	id: "progressive-lens-adaptation.md";
  slug: "progressive-lens-adaptation";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"progressive-lens-dizzy.md": {
	id: "progressive-lens-dizzy.md";
  slug: "progressive-lens-dizzy";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"rgp-hard-contact-lens.md": {
	id: "rgp-hard-contact-lens.md";
  slug: "rgp-hard-contact-lens";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"rimless-glasses-guide.md": {
	id: "rimless-glasses-guide.md";
  slug: "rimless-glasses-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"xinzhuang-glasses-guide.md": {
	id: "xinzhuang-glasses-guide.md";
  slug: "xinzhuang-glasses-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"zeiss-hoya-nikon-lens-guide.md": {
	id: "zeiss-hoya-nikon-lens-guide.md";
  slug: "zeiss-hoya-nikon-lens-guide";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"zeiss-individual-worth-it.md": {
	id: "zeiss-individual-worth-it.md";
  slug: "zeiss-individual-worth-it";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"blog-en": {
"astigmatism-glasses-distortion.md": {
	id: "astigmatism-glasses-distortion.md";
  slug: "astigmatism-glasses-distortion";
  body: string;
  collection: "blog-en";
  data: InferEntrySchema<"blog-en">
} & { render(): Render[".md"] };
"children-myopia-tracking-xinzhuang.md": {
	id: "children-myopia-tracking-xinzhuang.md";
  slug: "children-myopia-tracking-xinzhuang";
  body: string;
  collection: "blog-en";
  data: InferEntrySchema<"blog-en">
} & { render(): Render[".md"] };
"common-optometry-mistakes.md": {
	id: "common-optometry-mistakes.md";
  slug: "common-optometry-mistakes";
  body: string;
  collection: "blog-en";
  data: InferEntrySchema<"blog-en">
} & { render(): Render[".md"] };
"contact-lens-fatigue.md": {
	id: "contact-lens-fatigue.md";
  slug: "contact-lens-fatigue";
  body: string;
  collection: "blog-en";
  data: InferEntrySchema<"blog-en">
} & { render(): Render[".md"] };
"contact-lens-vs-glasses.md": {
	id: "contact-lens-vs-glasses.md";
  slug: "contact-lens-vs-glasses";
  body: string;
  collection: "blog-en";
  data: InferEntrySchema<"blog-en">
} & { render(): Render[".md"] };
"digital-eye-strain-solution.md": {
	id: "digital-eye-strain-solution.md";
  slug: "digital-eye-strain-solution";
  body: string;
  collection: "blog-en";
  data: InferEntrySchema<"blog-en">
} & { render(): Render[".md"] };
"driving-lens-night-glare.md": {
	id: "driving-lens-night-glare.md";
  slug: "driving-lens-night-glare";
  body: string;
  collection: "blog-en";
  data: InferEntrySchema<"blog-en">
} & { render(): Render[".md"] };
"glasses-dizzy.md": {
	id: "glasses-dizzy.md";
  slug: "glasses-dizzy";
  body: string;
  collection: "blog-en";
  data: InferEntrySchema<"blog-en">
} & { render(): Render[".md"] };
"high-myopia-glasses-guide.md": {
	id: "high-myopia-glasses-guide.md";
  slug: "high-myopia-glasses-guide";
  body: string;
  collection: "blog-en";
  data: InferEntrySchema<"blog-en">
} & { render(): Render[".md"] };
"myopia-getting-worse-truth.md": {
	id: "myopia-getting-worse-truth.md";
  slug: "myopia-getting-worse-truth";
  body: string;
  collection: "blog-en";
  data: InferEntrySchema<"blog-en">
} & { render(): Render[".md"] };
"optometry-vs-ophthalmology.md": {
	id: "optometry-vs-ophthalmology.md";
  slug: "optometry-vs-ophthalmology";
  body: string;
  collection: "blog-en";
  data: InferEntrySchema<"blog-en">
} & { render(): Render[".md"] };
"presbyopia-vs-progressive.md": {
	id: "presbyopia-vs-progressive.md";
  slug: "presbyopia-vs-progressive";
  body: string;
  collection: "blog-en";
  data: InferEntrySchema<"blog-en">
} & { render(): Render[".md"] };
"progressive-lens-adaptation.md": {
	id: "progressive-lens-adaptation.md";
  slug: "progressive-lens-adaptation";
  body: string;
  collection: "blog-en";
  data: InferEntrySchema<"blog-en">
} & { render(): Render[".md"] };
"progressive-lens-dizzy.md": {
	id: "progressive-lens-dizzy.md";
  slug: "progressive-lens-dizzy";
  body: string;
  collection: "blog-en";
  data: InferEntrySchema<"blog-en">
} & { render(): Render[".md"] };
"xinzhuang-glasses-guide.md": {
	id: "xinzhuang-glasses-guide.md";
  slug: "xinzhuang-glasses-guide";
  body: string;
  collection: "blog-en";
  data: InferEntrySchema<"blog-en">
} & { render(): Render[".md"] };
"zeiss-hoya-nikon-lens-guide.md": {
	id: "zeiss-hoya-nikon-lens-guide.md";
  slug: "zeiss-hoya-nikon-lens-guide";
  body: string;
  collection: "blog-en";
  data: InferEntrySchema<"blog-en">
} & { render(): Render[".md"] };
"zeiss-individual-worth-it.md": {
	id: "zeiss-individual-worth-it.md";
  slug: "zeiss-individual-worth-it";
  body: string;
  collection: "blog-en";
  data: InferEntrySchema<"blog-en">
} & { render(): Render[".md"] };
};
"portfolio": {
"black-gold-bold.md": {
	id: "black-gold-bold.md";
  slug: "black-gold-bold";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"bronze-vintage-round.md": {
	id: "bronze-vintage-round.md";
  slug: "bronze-vintage-round";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"champagne-gold-round.md": {
	id: "champagne-gold-round.md";
  slug: "champagne-gold-round";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"chanel-quilted.md": {
	id: "chanel-quilted.md";
  slug: "chanel-quilted";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"charmant-rimless-round.md": {
	id: "charmant-rimless-round.md";
  slug: "charmant-rimless-round";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"charmant-rimless.md": {
	id: "charmant-rimless.md";
  slug: "charmant-rimless";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"clear-square-acetate.md": {
	id: "clear-square-acetate.md";
  slug: "clear-square-acetate";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"clip-on-polarized.md": {
	id: "clip-on-polarized.md";
  slug: "clip-on-polarized";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"dior-clear-gold.md": {
	id: "dior-clear-gold.md";
  slug: "dior-clear-gold";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"dior-square.md": {
	id: "dior-square.md";
  slug: "dior-square";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"dita-detail.md": {
	id: "dita-detail.md";
  slug: "dita-detail";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"emporio-armani-metal.md": {
	id: "emporio-armani-metal.md";
  slug: "emporio-armani-metal";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"ferrari-sport-sunglasses.md": {
	id: "ferrari-sport-sunglasses.md";
  slug: "ferrari-sport-sunglasses";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"gucci-gg-sunglasses.md": {
	id: "gucci-gg-sunglasses.md";
  slug: "gucci-gg-sunglasses";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"gucci-round-metal.md": {
	id: "gucci-round-metal.md";
  slug: "gucci-round-metal";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"magnetic-clip-on.md": {
	id: "magnetic-clip-on.md";
  slug: "magnetic-clip-on";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"minamoto-silver-round.md": {
	id: "minamoto-silver-round.md";
  slug: "minamoto-silver-round";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"minamoto-titanium-round.md": {
	id: "minamoto-titanium-round.md";
  slug: "minamoto-titanium-round";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"minimal-titanium-round.md": {
	id: "minimal-titanium-round.md";
  slug: "minimal-titanium-round";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"miumiu-acetate.md": {
	id: "miumiu-acetate.md";
  slug: "miumiu-acetate";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"oliver-peoples-clear-round.md": {
	id: "oliver-peoples-clear-round.md";
  slug: "oliver-peoples-clear-round";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"oliver-peoples-titanium.md": {
	id: "oliver-peoples-titanium.md";
  slug: "oliver-peoples-titanium";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"rosegold-titanium-round.md": {
	id: "rosegold-titanium-round.md";
  slug: "rosegold-titanium-round";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"temple-hinge-macro.md": {
	id: "temple-hinge-macro.md";
  slug: "temple-hinge-macro";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"thin-metal-round.md": {
	id: "thin-metal-round.md";
  slug: "thin-metal-round";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"titanium-temple-detail.md": {
	id: "titanium-temple-detail.md";
  slug: "titanium-temple-detail";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"tomford-clear-blue.md": {
	id: "tomford-clear-blue.md";
  slug: "tomford-clear-blue";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"tomford-gold-round.md": {
	id: "tomford-gold-round.md";
  slug: "tomford-gold-round";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"tortoise-round.md": {
	id: "tortoise-round.md";
  slug: "tortoise-round";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
"tortoise-texture-macro.md": {
	id: "tortoise-texture-macro.md";
  slug: "tortoise-texture-macro";
  body: string;
  collection: "portfolio";
  data: InferEntrySchema<"portfolio">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		"settings": {
"homepage": {
	id: "homepage";
  collection: "settings";
  data: any
};
};

	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("../../src/content/config.js");
}

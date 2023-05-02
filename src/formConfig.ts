export type DynamicField = {
  id: string;
  value: string;
}

export type FormValues = {
  "section-1-text-name-1": string;
  "section-1-text-name-2": string;
  "section-1-select-name-3": string;
  "section-1-select-name-4": string;
  "section-1-dynamic-name-5": DynamicField[];

  "section-2-text-name-1": string;
  "section-2-text-name-2": string;
  "section-2-select-name-3": string;
  "section-2-select-name-4": string;
  "section-2-dynamic-name-5": DynamicField[];

  "section-3-text-name-1": string;
  "section-3-text-name-2": string;
  "section-3-select-name-3": string;
  "section-3-select-name-4": string;
  "section-3-dynamic-name-5": DynamicField[];

  "section-4-text-name-1": string;
  "section-4-text-name-2": string;
  "section-4-select-name-3": string;
  "section-4-select-name-4": string;
  "section-4-dynamic-name-5": DynamicField[];

  'section-5-additional': boolean,
  "section-5-text-name-1": string;
  "section-5-text-name-2": string;
  "section-5-select-name-3": string;
  "section-5-select-name-4": string;
  "section-5-dynamic-name-5": DynamicField[];
};

type FormKeys = keyof FormValues;

export const initialValues: FormValues = {
  "section-1-text-name-1": "",
  "section-1-text-name-2": "",
  "section-1-select-name-3": "",
  "section-1-select-name-4": "",
  "section-1-dynamic-name-5": [],

  "section-2-text-name-1": "",
  "section-2-text-name-2": "",
  "section-2-select-name-3": "",
  "section-2-select-name-4": "",
  "section-2-dynamic-name-5": [],

  "section-3-text-name-1": "",
  "section-3-text-name-2": "",
  "section-3-select-name-3": "",
  "section-3-select-name-4": "",
  "section-3-dynamic-name-5": [],

  "section-4-text-name-1": "",
  "section-4-text-name-2": "",
  "section-4-select-name-3": "",
  "section-4-select-name-4": "",
  "section-4-dynamic-name-5": [],

  'section-5-additional': false,
  "section-5-text-name-1": "",
  "section-5-text-name-2": "",
  "section-5-select-name-3": "",
  "section-5-select-name-4": "",
  "section-5-dynamic-name-5": [],
};


export const validation = (values: FormValues) => ({
  "section-1-text-name-1": values["section-1-text-name-1"].length === 0 ? "This field is required" : "",
  "section-1-text-name-2": values["section-1-text-name-2"].length === 0 ? "This field is required" : "",
  "section-1-select-name-3": "",
  "section-1-select-name-4": values["section-1-select-name-4"].length === 0 ? "This field is required" : "",
  "section-1-dynamic-name-5": "",

  "section-2-text-name-1": "",
  "section-2-text-name-2": values["section-2-text-name-2"].length === 0 ? "This field is required" : "",
  "section-2-select-name-3": values["section-2-select-name-3"].length === 0 ? "This field is required" : "",
  "section-2-select-name-4": "",
  "section-2-dynamic-name-5": "",

  "section-3-text-name-1": "",
  "section-3-text-name-2": values["section-3-text-name-2"].length === 0 ? "This field is required" : "",
  "section-3-select-name-3": "",
  "section-3-select-name-4": "",
  "section-3-dynamic-name-5": values["section-1-dynamic-name-5"].length > 0 && values["section-2-dynamic-name-5"].length > 0 ? "" :
    "This field is dependent on section 1 and section 2, please fill them first",

  "section-4-text-name-1": values["section-4-text-name-1"].length === 0 ? "This field is required" : "",
  "section-4-text-name-2": values["section-4-text-name-2"].length === 0 ? "This field is required" : "",
  "section-4-select-name-3": "",
  "section-4-select-name-4": values["section-4-select-name-4"].length === 0 ? "This field is required" : "",
  "section-4-dynamic-name-5": values["section-3-dynamic-name-5"].length > 0 && values["section-3-dynamic-name-5"].length < 3 ? "" :
    "This field is dependent on section 3, you need to fill at least 1 and at most 2 items",

  'section-5-additional': "",
  "section-5-text-name-1": values["section-5-text-name-1"].length > 0 || values["section-5-additional"] === false ? "" : "The additional section is required",
  "section-5-text-name-2": values["section-5-text-name-2"].length > 0 || values["section-5-additional"] === false ? "" : "The additional section is required",
  "section-5-select-name-3": values["section-5-select-name-3"].length > 0 || values["section-5-additional"] === false ? "" : "The additional section is required",
  "section-5-select-name-4": values["section-5-select-name-4"].length > 0 || values["section-5-additional"] === false ? "" : "The additional section is required",
  "section-5-dynamic-name-5": values["section-5-dynamic-name-5"].length > 0 || values["section-5-additional"] === false ? "" : "The additional section is required",
})

type UserSuffix = '-select-name-3'
type PostSuffix = '-select-name-4'
type SectionPreffix = 'section-'
type ExtractUserSelects<T extends string> = T extends `${infer U}${UserSuffix}` ? `${U}${UserSuffix}` : never;
type ExtractPostsSelects<T extends string> = T extends `${infer U}${PostSuffix}` ? `${U}${PostSuffix}` : never;
type ExtractSections<T extends string> = T extends `${SectionPreffix}${infer U}-${infer _V}` ? `section-${U}` : never;

export type SelectKeysUsers = ExtractUserSelects<FormKeys>;
export type SelectKeysPosts = ExtractPostsSelects<FormKeys>;
export type AllSelectKeys = SelectKeysUsers | SelectKeysPosts;
export type AllSections = ExtractSections<FormKeys>;
export type FormSelectKeyUsers = {
  [key in SelectKeysUsers]: string;
}

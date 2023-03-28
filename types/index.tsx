import { Database } from "./supabase";
import { Json } from "./supabase";

// basic
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Account = Database["public"]["Tables"]["accounts"]["Row"];
export type ImageDefaults =
  Database["public"]["Tables"]["image_defaults"]["Row"];

export type Generation = Database["public"]["Tables"]["generations"]["Row"];

export type GenerationOutputs = Json;

export type AccountWithProfile = Account & {
  profile: Profile;
};

export type UserSettings = Account & {
  profile: Profile;
  image_defaults: ImageDefaults;
};

export type AccountWithProfileAndDefaults = Account & {
  profile: Profile;
  image_defaults: ImageDefaults;
};

export type Credits = Database["public"]["Tables"]["credits"]["Row"];

export type ImageOutput = Database["public"]["Tables"]["image_outputs"]["Row"];
export type ImageOutputUpdate =
  Database["public"]["Tables"]["image_outputs"]["Update"];

export type ImageOutputInsert =
  Database["public"]["Tables"]["image_outputs"]["Insert"];

export type AccountProfileCredits = Account & {
  profile: Profile;
  credits: Credits;
};

export type AccountProfileCreditsDefaults = Account & {
  profile: Profile;
  credits: Credits;
  image_defaults: ImageDefaults;
};

export type SignUrlResult = {
  path: "";
  error: null | string;
  signedURL: "";
  signedUrl: "";
};

export type SignedUrl = {
  xs?: string;
  sm?: string;
  md?: string;
  og: string;
};

export type ImageOutputWithSignedUrls = ImageOutput & {
  signed_urls: SignedUrl[];
};

export type AppData = {
  account: Account;
  profile: Profile;
  credits: Credits;
  image_defaults?: ImageDefaults;
  image_processing?: ImageOutput[];
  image_generations?: ImageOutput[];
  image_insert?: ImageOutputInsert;
};

import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useMutation } from "@tanstack/react-query";

// atoms
import { useAtom, useAtomValue } from "jotai";
import { imageInsertAtom } from "@/atoms/image";
import { useQueryClient } from "@tanstack/react-query";

// types
import { Database } from "@/types/supabase";

export default function useCreateImage() {
  const queryClient = useQueryClient();
  const imageInsert = useAtomValue(imageInsertAtom);
  const user = useUser();
  const supabase = useSupabaseClient<Database>();

  const createGeneration = async () => {
    const i = imageInsert;
    if (user?.id) {
      i.id = user?.id;
    } else {
      throw new Error("User not logged in.");
    }

    const { data, error } = await supabase
      .from("image_outputs")
      .insert(i)
      .select()
      .single();

    if (error) throw new Error(error.message);

    // setImageInsert(data);
    // invalidate queries
    // await queryClient.invalidateQueries("image_outputs");

    return data;
  };

  return useMutation(() => createGeneration(), {
    async onSuccess() {
      // await clearCartMutation.mutateAsync(cart!.id);
      console.log("Generation pending.");

      await queryClient.refetchQueries(["image_processing"]).then(() => {
        console.log("refetched image queries.");
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
}

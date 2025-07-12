import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { FormInput } from "../ui/Input";
import UploadMedia from "../ui/UploadMedia";
import { Button } from "../ui/button";

type FormValues = {
  name: string;
  age: number;
  email: string;
  photos: string[];
};
export default function CreateVideo() {
  const methods = useForm<FormValues>();
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log("Submitted data:", data);
  };

  const handleUpload = async (formData: FormData): Promise<string[] | void> => {
    console.log(formData);
    // const res = await uploadFile(formData).unwrap();

    // return res?.success ? res?.data?.images : [];
  };
  //   const onSubmit = (data: { photos: string[] }) => {
  //     console.log("Uploaded URLs:", data.photos);
  //   };

  return (
    <div className="min-h-screen bg-white w-full md:w-1/2 ">
      <div className="">
        <h1 className="text-base font-medium py-8 text-[#262626]">
          Upload New Video
        </h1>
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          noValidate
          className="space-y-5"
        >
          <FormInput<FormValues>
            name="name"
            placeholder="Write video title here...."
          />
          <UploadMedia name="photos" onUpload={handleUpload} />

          <Button type="submit" variant="default" className="w-full p-6">
            Create
          </Button>
        </form>
      </FormProvider>
    </div>
  );
}

import JoditEditor from "jodit-react";
import { useEffect, useRef, useState } from "react";
import ReuseButton from "../../../ui/Button/ReuseButton";
import {
  useAddStaticDataMutation,
  useGetStaticDataQuery,
} from "../../../redux/features/staticContent/staticContentApi";
import { toast } from "sonner";
import Loading from "../../../ui/Loading";

const TermsOfService = () => {
  const { data, isFetching } = useGetStaticDataQuery({});
  const [updateStaticContent] = useAddStaticDataMutation();
  const editor = useRef(null);
  const [content, setContent] = useState("");

  useEffect(() => {
    if (data) {
      setContent(data?.data?.termsAndService);
    }
  }, [data]);

  const handleOnSave = async () => {
    const toastId = toast.loading("Updating Terms and Conditions...");

    const data = {
      termsAndService: content,
    };
    try {
      const res = await updateStaticContent(data).unwrap();
      toast.success(res?.message, { id: toastId, duration: 2000 });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error?.data?.message || "Failed to update Terms and Conditions",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <Loading />
      </div>
    );
  }
  return (
    <div
      className=" min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  rgba(0, 0, 0, 0.25)" }}
    >
      <div className="bg-secondary-color w-full flex items-center p-5 mb-10  rounded-tl-xl rounded-tr-xl">
        <p className="text-2xl text-primary-color font-semibold">
          Terms & Conditions
        </p>
      </div>
      <div className=" flex justify-center items-center">
        <div className="w-[95%]">
          <div className="">
            <JoditEditor
              ref={editor}
              value={content}
              config={{ height: 500, theme: "light", readonly: false }}
              onBlur={(newContent) => setContent(newContent)}
            />
          </div>
          <ReuseButton
            htmlType="button"
            onClick={handleOnSave}
            variant="secondary"
            className="w-full mt-4"
          >
            Save
          </ReuseButton>
        </div>
      </div>
    </div>
  );
};
export default TermsOfService;

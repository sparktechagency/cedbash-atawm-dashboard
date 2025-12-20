/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseUpload from "../../Form/ReuseUpload";
import ReuseButton from "../../Button/ReuseButton";
import { getImageUrl } from "../../../helpers/config/envConfig";
import { useUpdateBadgeMutation } from "../../../redux/features/badge/badgeApi";
import { useEffect } from "react";
import { IBadge } from "../../../types";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

interface EditBadgeProps {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IBadge | null;
}

const EditBadge: React.FC<EditBadgeProps> = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [form] = Form.useForm();
  const serverUrl = getImageUrl();
  const [updateBadge] = useUpdateBadgeMutation();

  useEffect(() => {
    if (currentRecord) {
      form.setFieldsValue({
        name: currentRecord?.name,
      });
    }
  }, [currentRecord, form]);

  const handleFinish = async (values: any) => {
    const formData = new FormData();

    const payload = {
      name: values.name,
    };

    if (values.image?.[0]?.originFileObj) {
      formData.append("image", values.image?.[0]?.originFileObj);
    }

    formData.append("data", JSON.stringify(payload));

    const res = await tryCatchWrapper(
      updateBadge,
      { body: formData, params: currentRecord?._id },
      "Updating Badge..."
    );

    if (res?.statusCode === 200) {
      form.resetFields();
      handleCancel();
    }
  };
  return (
    <Modal open={isEditModalVisible} onCancel={handleCancel} footer={null}>
      <div className="mt-10">
        <div className="!mb-8">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-base-color text-center">
            Edit Badge
          </h1>
        </div>
        <ReusableForm form={form} handleFinish={handleFinish}>
          <ReuseInput
            name="name"
            type="text"
            label="Badge Name"
            placeholder="Badge Name"
          />
          <ReuseUpload
            name="image"
            label="Badge Image"
            maxCount={1}
            accept="image/*"
          />{" "}
          <div className="mt-10">
            <p className="text-base-color text-sm mb-3">Your Current Image</p>
            <img
              src={serverUrl + currentRecord?.image}
              alt=""
              className="w-20 h-auto object-cover"
            />
          </div>
          <ReuseButton htmlType="submit" variant="secondary" className="!mt-10">
            Update
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default EditBadge;

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseUpload from "../../Form/ReuseUpload";
import ReuseButton from "../../Button/ReuseButton";
import { useUpdateCategoryMutation } from "../../../redux/features/category/categoryApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
import { ICategory } from "../../../types";
import { useEffect } from "react";
import { getImageUrl } from "../../../helpers/config/envConfig";

interface EditCategoryProps {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: ICategory | null;
}

const EditCategory: React.FC<EditCategoryProps> = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const serverUrl = getImageUrl();
  const [form] = Form.useForm();
  const [addCategory] = useUpdateCategoryMutation();

  useEffect(() => {
    if (currentRecord) {
      form.setFieldsValue({
        name: currentRecord?.categoryName,
      });
    }
  }, [currentRecord, form]);

  const handleFinish = async (values: any) => {
    const formData = new FormData();

    const payload = {
      categoryName: values.name,
    };

    if (values.image?.[0]?.originFileObj) {
      formData.append("image", values.image?.[0]?.originFileObj);
    }

    formData.append("data", JSON.stringify(payload));

    const res = await tryCatchWrapper(
      addCategory,
      { body: formData, params: currentRecord?._id },
      "Updating Category..."
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
            Edit Category
          </h1>
        </div>
        <ReusableForm form={form} handleFinish={handleFinish}>
          <ReuseInput
            name="name"
            type="text"
            label="Category Name"
            placeholder="Category Name"
          />
          <ReuseUpload
            name="image"
            label="Category Image"
            maxCount={1}
            accept="image/*"
          />

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

export default EditCategory;

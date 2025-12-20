/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseUpload from "../../Form/ReuseUpload";
import ReuseButton from "../../Button/ReuseButton";
import { useAddBadgeMutation } from "../../../redux/features/badge/badgeApi";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";

interface AddBadgeProps {
  isAddModalVisible: boolean;
  handleCancel: () => void;
}

const AddBadge: React.FC<AddBadgeProps> = ({
  isAddModalVisible,
  handleCancel,
}) => {
  const [form] = Form.useForm();
  const [addBadge] = useAddBadgeMutation();

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
      addBadge,
      { body: formData },
      "Adding Badge..."
    );

    if (res?.statusCode === 201) {
      form.resetFields();
      handleCancel();
    }
  };
  return (
    <Modal open={isAddModalVisible} onCancel={handleCancel} footer={null}>
      <div className="mt-10">
        <div className="!mb-8">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-base-color text-center">
            Add New Badge
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
          />
          <ReuseButton htmlType="submit" variant="secondary" className="!mt-10">
            Submit
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default AddBadge;

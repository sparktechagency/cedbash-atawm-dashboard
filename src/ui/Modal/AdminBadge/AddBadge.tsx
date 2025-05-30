import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseUpload from "../../Form/ReuseUpload";
import ReuseButton from "../../Button/ReuseButton";

interface AddBadgeProps {
  isAddModalVisible: boolean;
  handleCancel: () => void;
}

const AddBadge: React.FC<AddBadgeProps> = ({
  isAddModalVisible,
  handleCancel,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal open={isAddModalVisible} onCancel={handleCancel} footer={null}>
      <div className="mt-10">
        <div className="!mb-8">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-base-color text-center">
            Add New Badge
          </h1>
        </div>
        <ReusableForm form={form} handleFinish={() => {}}>
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

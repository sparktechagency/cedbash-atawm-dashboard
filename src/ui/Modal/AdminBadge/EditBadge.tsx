/* eslint-disable @typescript-eslint/no-explicit-any */
import { Form, Modal } from "antd";
import ReusableForm from "../../Form/ReuseForm";
import ReuseInput from "../../Form/ReuseInput";
import ReuseUpload from "../../Form/ReuseUpload";
import ReuseButton from "../../Button/ReuseButton";

interface EditBadgeProps {
  isEditModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: any | null;
}

const EditBadge: React.FC<EditBadgeProps> = ({
  isEditModalVisible,
  handleCancel,
  currentRecord,
}) => {
  const [form] = Form.useForm();

  return (
    <Modal open={isEditModalVisible} onCancel={handleCancel} footer={null}>
      <div className="mt-10">
        <div className="!mb-8">
          <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold text-base-color text-center">
            Edit Badge
          </h1>
        </div>
        <ReusableForm
          form={form}
          handleFinish={() => {}}
          defaultValues={currentRecord}
        >
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
            Update
          </ReuseButton>
        </ReusableForm>
      </div>
    </Modal>
  );
};

export default EditBadge;

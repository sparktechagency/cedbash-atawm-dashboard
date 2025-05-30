/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import ReuseButton from "../../Button/ReuseButton";
import { AllImages } from "../../../../public/images/AllImages";
import { useState } from "react";
interface AdminShowBadgeModalProps {
  isShowBadgeModal: boolean;
  handleCancel: () => void;
  currentRecord: any | null;
}

const badges = [
  {
    id: 1,
    name: "Level 1",
    image: AllImages.bedge3,
  },
  {
    id: 2,
    name: "Level 2",
    image: AllImages.badge2,
  },
  {
    id: 3,
    name: "Level 3",
    image: AllImages.badge,
  },
  {
    id: 4,
    name: "Level 4",
    image: AllImages.bedge4,
  },
];

const AdminShowBadgeModal: React.FC<AdminShowBadgeModalProps> = ({
  isShowBadgeModal,
  handleCancel,
  currentRecord,
}) => {
  const [selectedBadge, setSelectedBadge] = useState(null);
  const handleBadge = () => {
    console.log(currentRecord);
    handleCancel();
  };
  return (
    <Modal
      open={isShowBadgeModal}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="p-5">
        <div className="">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-base-color text-center">
            Badges
          </h3>

          <div className="flex items-center gap-10 flex-wrap mt-10">
            {badges?.map((badge: any) => (
              <div
                key={badge?.id}
                onClick={() => setSelectedBadge(badge?.id)}
                className={`!min-h-[100px] flex flex-col p-3 rounded-2xl items-center justify-between cursor-pointer ${
                  selectedBadge === badge?.id
                    ? "border-2 border-secondary-color"
                    : "border-2 border-transparent"
                }`}
              >
                <img
                  src={badge?.image}
                  alt={badge?.name}
                  className="w-10 h-auto "
                />
                <p className="text-sm sm:text-base lg:text-lg text-center mt-2 text-[#989898]">
                  {badge?.name}
                </p>
              </div>
            ))}
          </div>

          <ReuseButton
            onClick={handleBadge}
            variant="secondary"
            className="mt-5"
          >
            Assign Badge
          </ReuseButton>
        </div>
      </div>
    </Modal>
  );
};

export default AdminShowBadgeModal;

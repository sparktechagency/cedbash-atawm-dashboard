/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import ReuseButton from "../../Button/ReuseButton";
import { AllImages } from "../../../../public/images/AllImages";
import { useEffect, useState } from "react";
import { IBadge, IVendorUser } from "../../../types";
import { getImageUrl } from "../../../helpers/config/envConfig";
import {
  useGetAllBadgeQuery,
  useGiveABadgeMutation,
} from "../../../redux/features/badge/badgeApi";
import SpinLoader from "../../SpinLoader";
import tryCatchWrapper from "../../../utils/tryCatchWrapper";
interface AdminShowBadgeModalProps {
  isShowBadgeModal: boolean;
  handleCancel: () => void;
  currentRecord: IVendorUser | null;
}

const AdminShowBadgeModal: React.FC<AdminShowBadgeModalProps> = ({
  isShowBadgeModal,
  handleCancel,
  currentRecord,
}) => {
  const serverUrl = getImageUrl();
  const [giveBadge] = useGiveABadgeMutation();

  const { data, isFetching } = useGetAllBadgeQuery(
    {},
    {
      skip: currentRecord?._id ? false : true,
      refetchOnMountOrArgChange: true,
    }
  );

  const allBadges: IBadge[] = data?.data;

  const [selectedBadge, setSelectedBadge] = useState(null);

  useEffect(() => {
    setSelectedBadge(currentRecord?.badgeId as any);
  }, [currentRecord?.badgeId, isShowBadgeModal]);

  const handleBadge = async () => {
    console.log(selectedBadge);
    const res = await tryCatchWrapper(
      giveBadge,
      {
        body: {
          userId: currentRecord?._id,
          badgeId: selectedBadge,
        },
      },
      "Giving badge..."
    );
    if (res.statusCode === 200) {
      handleCancel();
    }
    console.log(res);
  };
  return (
    <Modal
      open={isShowBadgeModal}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[650px]"
    >
      <div className="p-5">
        <div className="">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-base-color text-center">
            Badges
          </h3>

          <div className="flex items-center gap-10 flex-wrap mt-10">
            {isFetching ? (
              <SpinLoader />
            ) : (
              allBadges?.map((badge: IBadge) => (
                <div
                  key={badge?._id}
                  onClick={() => setSelectedBadge(badge?._id as any)}
                  className={`!min-h-[100px] flex flex-col p-3 rounded-2xl items-center justify-between cursor-pointer ${
                    selectedBadge === badge?._id
                      ? "border-2 border-secondary-color"
                      : "border-2 border-transparent"
                  }`}
                >
                  <img
                    src={
                      badge?.image?.length > 0
                        ? serverUrl + badge?.image
                        : AllImages?.defaultCover
                    }
                    alt="Badge"
                    className="w-10 h-10 object-cover "
                  />
                  <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-secondary-color">
                    {badge?.name}
                  </p>
                </div>
              ))
            )}
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

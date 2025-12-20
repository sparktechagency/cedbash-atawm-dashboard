import { EditOutlined } from "@ant-design/icons";
import ReuseButton from "../../ui/Button/ReuseButton";
import ReusableForm from "../../ui/Form/ReuseForm";
import ReuseInput from "../../ui/Form/ReuseInput";
import { useGetProfileQuery } from "../../redux/features/profile/profileApi";
import { getImageUrl } from "../../helpers/config/envConfig";
import Loading from "../../ui/Loading";

const inputStructure = [
  {
    name: "email",
    type: "email",
    inputType: "email",
    label: "Email",
    placeholder: "Enter your email",
    labelClassName: "!font-medium",
    inputClassName: "!py-2 !w-full",
    rules: [{ required: true, message: "Email is required" }],
  },
  {
    name: "fullName",
    type: "text",
    inputType: "text",
    label: "User name",
    placeholder: "Enter your username",
    labelClassName: "!font-medium",
    inputClassName: "!py-2 !w-full",
    rules: [{ required: true, message: "User name is required" }],
  },
  {
    name: "phone",
    type: "text",
    inputType: "tel",
    label: "Contact number",
    placeholder: "Enter your contact number",
    labelClassName: "!font-medium",
    inputClassName: "!py-2 !w-full",
    rules: [{ required: true, message: "Contact number is required" }],
  },
];

const Profile = () => {
  const serverUrl = getImageUrl();

  const { data, isFetching } = useGetProfileQuery({});

  const profileData = data?.data;

  const profileImage = serverUrl + profileData?.profileImage;

  if (isFetching) {
    return (
      <div className="flex items-center justify-center min-h-[90vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div
      className="bg-primary-color min-h-[90vh]  rounded-xl"
      style={{ boxShadow: "0px 0px 5px  #0000000D" }}
    >
      <div className="bg-secondary-color w-full flex items-center p-5 mb-10  rounded-tl-xl rounded-tr-xl">
        <p className="text-3xl text-primary-color font-semibold w-[95%] mx-auto">
          Profile
        </p>
      </div>
      <div className=" flex justify-center items-center">
        <div className=" text-base-color rounded-lg h-full w-full lg:w-[70%]">
          <div className="flex flex-col items-center justify-between">
            <div className="flex flex-col items-center justify-center gap-5">
              <img
                className="h-36 w-36 rounded-full border-2 border-secondary-color relative"
                src={profileImage}
                alt=""
              />
              <p className="text-4xl font-semibold">{profileData?.fullName}</p>
            </div>
            <div className="w-full flex justify-end mt-5">
              <ReuseButton
                className="!px-4"
                variant="secondary"
                htmlType="button"
                url={`/admin/profile/edit-profile`}
              >
                <div className="flex gap-3">
                  <EditOutlined
                    className="text-lg"
                    style={{ color: "#FAFAFA" }}
                  />
                  <p className="text-primary-color text-lg">Edit Profile</p>
                </div>
              </ReuseButton>
            </div>
          </div>
          <div className="flex flex-col w-full items-center text-white mt-5">
            <ReusableForm
              handleFinish={() => {}}
              className="!w-full"
              defaultValues={profileData}
            >
              {inputStructure.map((input, index) => (
                <ReuseInput
                  key={index}
                  name={input.name}
                  Typolevel={4}
                  inputType={input.inputType}
                  type={input.type}
                  label={input.label}
                  placeholder={input.placeholder}
                  labelClassName={input.labelClassName}
                  inputClassName={input.inputClassName}
                  rules={input.rules}
                  disabled
                />
              ))}
            </ReusableForm>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Profile;

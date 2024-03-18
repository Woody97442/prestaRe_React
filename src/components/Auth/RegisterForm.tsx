import { useForm } from "react-hook-form";
import { FormData } from "@/types/RegisterFormShema";
import FormField from "../Form/FormField";
import { RegisterShema } from "@/types/RegisterFormShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MdAlternateEmail, MdOutlineKeyboardTab } from "react-icons/md";
import { FaUserAlt, FaKey, FaPhone } from "react-icons/fa";
import { IoKeyOutline } from "react-icons/io5";
import { JobListContext } from "@/App";
import { useContext } from "react";
import { PiTextAlignLeftFill } from "react-icons/pi";

function RegisterForm() {
  const areaLabel = ["Nord", "Sud", "Est", "Ouest"];
  const { jobList } = useContext(JobListContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    // setError,
  } = useForm<FormData>({
    resolver: zodResolver(RegisterShema),
  });

  const onSubmit = async (data: FormData) => {
    console.log("SUCCESS", data);
  };

  return (
    <div
      role="tabpanel"
      className="tab-content p-10">
      <h3 className=" text-center mb-4 font-bold text-lg">Sign Up</h3>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3">
        <FormField
          type="email"
          placeholder="Email"
          name="email"
          register={register}
          error={errors.email}
          valueAsNumber={false}
          icon={<MdAlternateEmail className="w-4 h-4 opacity-70" />}
        />

        <FormField
          type="text"
          placeholder="Username"
          name="username"
          register={register}
          error={errors.username}
          valueAsNumber={false}
          icon={<FaUserAlt className="w-4 h-4 opacity-70" />}
        />

        <FormField
          type="password"
          placeholder="Password"
          name="password"
          register={register}
          error={errors.password}
          valueAsNumber={false}
          icon={<FaKey className="w-4 h-4 opacity-70" />}
        />

        <FormField
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          register={register}
          error={errors.confirmPassword}
          valueAsNumber={false}
          icon={<IoKeyOutline className="w-4 h-4 opacity-70" />}
        />

        <FormField
          type="select"
          placeholder={areaLabel[0]}
          name="area"
          register={register}
          error={errors.area}
          valueAsNumber={false}
          options={areaLabel.map((option) => ({ name: option, value: option }))}
        />

        <FormField
          type="select"
          placeholder={""}
          name="area"
          register={register}
          error={errors.area}
          valueAsNumber={false}
          options={jobList.map((job) => ({ name: job.name, value: job.id }))}
        />

        <FormField
          type="tel"
          placeholder="06 00 00 00 00"
          name="phone"
          register={register}
          error={errors.phone}
          valueAsNumber={false}
          icon={<FaPhone className="w-4 h-4 opacity-70" />}
        />

        <input
          type="file"
          className="file-input file-input-bordered w-full"
        />

        <FormField
          type="textarea"
          placeholder="..."
          name="description"
          register={register}
          error={errors.description}
          valueAsNumber={false}
          icon={<PiTextAlignLeftFill className="w-4 h-4 opacity-70" />}
        />

        <button
          type="submit"
          className="btn btn-primary justify-center w-full">
          Register
          <MdOutlineKeyboardTab className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
}

export default RegisterForm;

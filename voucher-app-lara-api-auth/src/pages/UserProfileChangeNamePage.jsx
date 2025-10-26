import useCookie from "react-use-cookie";
import Container from "../components/Container";
import Breadcrumb from "../components/Breadcrumb";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useUserStore from "../stores/useUserStore";

const UserProfileChangeNamePage = () => {
  const [userCookie, setUserCookie] = useCookie("user");
  const [token] = useCookie("my_token");
  const { user, setUser } = useUserStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleUpdateName = async (data) => {
    const res = await fetch(
      import.meta.env.VITE_API_URL + "/user-profile/change-name",
      {
        method: "PATCH",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const json = await res.json();

    if (res.status === 200) {
      toast.success(json.message);
      setUserCookie(JSON.stringify(json.user));
      setUser(json.user);
      reset();
    } else {
      toast.error(json.message);
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 py-10">
      <Container>
        <Breadcrumb
          links={[{ title: "User Profile", path: "/dashboard/user-profile" }]}
          currentPageTitle={"Change Name"}
        />

        <div className="max-w-md mx-auto bg-white p-8 rounded-2xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            Update Your Name
          </h2>

          <form onSubmit={handleSubmit(handleUpdateName)} className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className={`block mb-2 text-sm font-medium ${
                  errors.name ? "text-red-500" : "text-gray-700"
                }`}
              >
                Enter New Name
              </label>

              <input
                type="text"
                id="name"
                defaultValue={user?.name || ""}
                {...register("name", {
                  required: true,
                  minLength: 3,
                  maxLength: 30,
                })}
                placeholder="e.g. John Doe"
                className={`w-full text-gray-900 text-sm rounded-lg border p-3 outline-none transition
                  ${
                    errors.name
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  }`}
              />

              {/* Validation messages */}
              {errors.name?.type === "required" && (
                <p className="text-red-500 text-sm mt-1">
                  Name is required.
                </p>
              )}
              {errors.name?.type === "minLength" && (
                <p className="text-red-500 text-sm mt-1">
                  Name must be at least 3 characters.
                </p>
              )}
              {errors.name?.type === "maxLength" && (
                <p className="text-red-500 text-sm mt-1">
                  Name must be less than 30 characters.
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium text-sm shadow hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
            >
              Update Name
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default UserProfileChangeNamePage;

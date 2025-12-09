import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../api/auth.js";
import {
  FiUser,
  FiMail,
  FiLock,
  FiPhone,
  FiHash,
  FiMapPin,
} from "react-icons/fi";
import { MdDateRange, MdPlace, MdUploadFile } from "react-icons/md";

export default function Register({ onRegister }) {
  const navigate = useNavigate();

  const [role, setRole] = useState("CITIZEN");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({});
  const [error, setError] = useState(null);

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Delhi",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  const specializations = [
    "Criminal Law",
    "Civil Law",
    "Family Law",
    "Property & Real Estate Law",
    "Consumer Protection Law",
    "Labour & Employment Law",
    "Corporate & Business Law",
    "Cyber Law",
    "Intellectual Property (IPR) Law",
    "Banking & Finance Law",
    "Taxation Law",
    "Constitutional Law",
    "Human Rights Law",
    "Environmental Law",
    "Medical Negligence Law",
    "Child Rights / Juvenile Justice Law",
    "Immigration Law",
    "Wills, Trusts & Inheritance Law",
    "Insurance Law",
  ];

  const ngoTypes = [
    "Human Rights NGO",
    "Women Protection & Welfare NGO",
    "Child Welfare NGO",
    "Consumer Rights NGO",
    "Cyber Safety & Digital Rights NGO",
    "Labour Rights NGO",
    "Community Development NGO",
    "Environmental Protection NGO",
    "Medical & Health Support NGO",
    "Anti-Trafficking NGO",
    "Migrant & Refugee Support NGO",
    "Financial Counseling NGO",
    "Disability Rights NGO",
    "Elderly Care NGO",
  ];

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await register({ ...form, role });
      const { accessToken, refreshToken } = res.data ?? {};

      if (!accessToken) throw new Error("Invalid registration response");

      localStorage.setItem("accessToken", accessToken);
      if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

      navigate("/");
    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const Input = ({ icon, label, name, type = "text", ...rest }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="flex items-center border border-gray-300 rounded-xl p-3 bg-white shadow-sm">
        {icon && <span className="text-gray-500 mr-3 text-lg">{icon}</span>}
        <input
          name={name}
          type={type}
          onChange={handleChange}
          className="w-full focus:outline-none"
          {...rest}
        />
      </div>
    </div>
  );

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-white to-blue-50 px-6">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 bg-white rounded-3xl shadow-2xl p-8">
        {/* LEFT IMAGE PANEL */}
        <div className="relative rounded-2xl overflow-hidden shadow-lg h-[600px]">
          <img
            src="https://images.unsplash.com/photo-1567784177951-6fa58317e16b"
            alt="legal support"
            className="absolute inset-0 w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div className="absolute bottom-8 left-8 text-white pr-6">
            <h2 className="text-3xl font-bold">Create Your Account</h2>
            <p className="mt-3 text-white/90">
              Register as a Citizen, Lawyer or NGO and contribute to fair and
              accessible justice.
            </p>

            <div className="flex gap-3 mt-5">
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                Verified Network
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                Secure Platform
              </span>
              <span className="px-3 py-1 bg-white/20 rounded-full text-xs">
                Legal Community
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="max-w-md mx-auto">
          {/* TITLE + LOGO SIDE BY SIDE */}
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Register Account
            </h2>

            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEX////cp0rbpUTbpEDcpkfaojvs0anhtm/ZoDTaoz3aoTnZnzHlv4TaoDbZni379u/gsWT9+/j26dfv2Lf58ufy38XiuHXerFfdqVD37d7rzqPox5Xv2bnx3cHt06369OvpyZrmwYjgsmfz483fr17YmyPnw4726tjXmRXju3zNnprbAAASLUlEQVR4nO1d65qyKhRWkEQJzPMpzbKa8f5vcANWU42HMq35nu37o5k0kSWLdQYVZcaMGTNmzJgxY8aMGTNmzJgxY8aMGTNmzJgxY8aMGR9F0npm1XqmmKAf0+EYtJyo6LblzK6YqC/TwDvojcd9AojTeGZ12EzZofERosZRVMMkCptO6MZu2g6NDheihrlYmvyDff0+kRpGNnmfxoVNVGb9OpqLgQrXv45vmIrf0KlxUQFU/jpYHkrFP/yeiD4CbQLo78JHgkLbuxywbf5BEUbG+UsNzxY/Npvlz5+G6LTLqLmQ32ydMd1SjkAFqbLZEVbVv0owZplSIu2DPR2KlDgWU1UVSSEZAlUFyPpCKvU2mH+BUvXvDf4LZpek3UT4u4gPZQ41A6pwqSiZqaoGBHvF1IASAcgJo5yJA37WUI11dvD6G/x7UHPOk35hqiQW3Kn6LqJlAJe+CV0fqLBQSqyaC1+DxaJRR/55LJYVjjm3Aj7ztgDmXKhgvUCLlcnVSALro5w7HbwN3E93dhAsMwD8T2yCSnERFES4ZAu3xOf/LSD1FR1QYarRitndTf1V6GjPPz1TWDd7KgWOBiCQHCm/pwYVVoGKqk928wWUKedMxf+WRnhChAFQJotEaL5MKhF79y0O5sd/UBnWWC6XG8XiwyTtN/6RV/xQtTgd4KzJT3rV8vjZbr6AI6sVuw1ObBgxzDW8Wn8JIjn7dHYoPtK7MWDHwiRTbFUzlvURL47jk+oL+IyUZ734H5UzAgYUn4ArQ5rKAy5DrHaTttwGAJH4D6uf6t4IWGDhMsRUBfv6QMXt0tqLsEOgITGcFf03lWENi6CC/9mAU0wjo2ptrgmsVCFvjoj8w0yqKDsNwjDcR/tQIEKqqnFbPApr8KMQgH9VGdbIuImtaZoKoKYBzAk0Qn4EUaBpBpBnVOR/upOPYNPKaFSFJidwWxjayvYNuFZcaGRWqBkLbo1rJlBR26XW7yjIJyCskTL6bqVwiwpLB1xaBgaXptTIlLWBhb1WCRmrb1KUtl1qfYfl6Q4fhPdtKSVj7XEy57DhNNEyRiY77hk+7A+Y7Qpmoi9f0Osd4tZrXcYceYdP4sgdhZB2BQLhKqdA3yZZGXunvtqWF5dZstWh4a66lKFLdkpGihH7+zxWLFa6hX2WO+0/sMu8W87YikOao+fvQsUf8oSy0PYzZf8xu9wTpohXMcLgVLewKSOkErydf2IyrqQnay3S3yHs8bBOF5LHQVsua0J45J1xeNaQIpgaDn6nBNjjdqUyFezvuCze4hXYbuGU7TbFdHAjRg/vsJr1A2Xhm3NvmXTT42TxHtZxkkTeKH6fjR59QLJx7NqrHEaGTci7bnUD9rbbWtPp+E5Q9rZbhUUJGHpn7YSHmVoe31fMYAUHrP3OYU8JH+Dv6i0aw64Dn97gfF9DIcZjOMVZg6nJXDfUGTyFFz2F8jC1ykjN4qXr4xfDv0dz6nx4QhOueYfnpBcvFHeJ+6Y0H3z9Y/C+yyUhYPBkUOHgMbBNwo7+tGEbQVe5Z2x4dY+P2qOH/bdfssPKOfVjGgApZV7Rg6omKhQGw5b3Liera7DZ8OdfIxHlM+RFU8HGk1lvFn0xAm8RTqAKXnSd18Z0uRxq5Eqm74uh16dAUKgO99fTfeArCwMMvb4XBStTDPFgLkOSQFHZNhAegyTx2WLo9f1YVgzvBxO4oTWF2nA29ULKqokKNXMpR73yhQI0C5/G8JWJGJfyCfvjh4iqjhTKowCapHC40r+gPIwfCd/VZQXPwvPzZLE+PZyMySFEJ1HouEmSl4NsFG2CEHEFhIQpXfeJHpVbgxoQQv6ZSu4uIz4Ld7KFssJInEM4Kp7gDst1HVH7MEHVdI7M2A6p+fBIWglEtXaQA1fnH1aaCgr+19nTyzkN4vDxWQUQXSkOQhPkEjSyCQFADw5hXBGo3gCQvKaQ64ol0W7OaQZOH2zYowCsPDJoyvTA2geE6I/1w1/9DNEPkK7sxBhaKvx9kg/yY+6/KBIPVtNYNZ7TRt/NcSsB6DJEmgZ+hgvs9xrXhvDm7OULwOH6uuOtRGyc8Wum46hHze/z0w/ifHdmTw0iau71YKfh84SU5JxJAlzI6IEeYopOT4Eza5WdG0p7ZImnjklnjEl3cxZlQK+CPTbrAeLUYT05awLbD+4mHqePXqpKPb8IyYlKYGC0CqqVeegJcMcMj0mhhTXhk/lLtU2w2xUFBuA8pwEAEVkldwErb2fcEEiPt0xo+2mEERQNaAAaoD0cVKpLEchUtXE9DFXjDsESww7fM1ttd2EUroLUbQzHHdEVgbgpl2SX+VbfR1Gop6uOaKwG8FH5otq4frCLUZlhlXXo5rLPjqp+xCvqCydtOygsmYrLzGh8SC9ge1gDg3Q4wPEi6DFNbHwRofueu30Fi45JljEjcg+DXbA2lGm16FKG31H43dNEeh7EvlCBc9h3elhWUhWjFoPFywf0PHc9+iiM6ZnCnh86B8V/wMOyqrGSQx47rd31OmYHq469ya+oVhmgb8Y6JNU7fAe/JqwcsUCDqIS35USsI22PAegtP8lrjdEbpykRgB0U6iyM5bpT2nfDh6EDWCgO03DHGD5CoSLNgX7XrsSq0TWGVGNisdiI1cWcuJCrRNgxN2y8KHCvCvbAA4KUk7DdJV2/WgHZny7d9SwSRktsdtlRnp6ku34zanfyD7uRu+Ha6DhvhwiXmI2ao3GqQO/wOS3FT6vV0lesnmE8+YddsG1l6ZPkYCsdD8zVg+XgXOsAON95uK5WSej3BYgeoLBQ3YPH8vCYfL8rkb4JLtq1bYRCZipLXYkO9PUx9MhBV6gbM9Y27S/3cPSRjG9GpKsWV99tU5vxZ+AmnFvDHlPjAQrLkHOnHgv/qOUXzmEpGbgaLUWz0oQv4zPQZoskgjfzROlPfMF+WSoL9HfiWW7bovcYiEd6RKOFFF2kEpvbza2Zv4Ms45VxXq1zED1ht3UrFUcm+iWF1qHlN0fIDT+LqeZo7kUEDN81QNuuALmsQKkp9Dtd81wEOIzOQOBeWuWSQmXZog9sqKHMhaBfsz4KKyLFioZtVmBdfFBTqBhdajiUcZqu0qa4LiirKdy0zcRNhIMjCcd08rMibfV43Np4OlGYdRg+Xu1cdKXndjXjrern1L6KPUuT99Visloz5ye50BGzKuooHGzP/8UnY/pEofeeasTFeSmA37CzjKKsT4N2ptBtF3DnMGO7wD0P2olCRW+SJfn+ZApYi3EMt5wwyYABpk2C0jx1ZnEeGdY2iI55jkO1sal3nnhnCuMmBVVSLCdGwcg4WUSPqJSTWHCd0XA2O8uNC4V5m1NziWK0StPqPCZnCpVVw2yzuZ5YiAIw6baOAR2ofFy4PmwyOsHZAL5QWKvHBvxEu5fNP9hcFOCFQqepKqECqqHERB3NQdwQDRRfSIMN0tm/6KQfChct8XhyibW16IvlpYkLhbWJcwfL1EzvCDRztChGDJGas8bchXqZmj8UKi21Z5eod8sYXtkwPxSWTXk0T2UuQmDMsP76WIgJYd+3eXX/KwqTZh8qPSfVaLMqO/7k9/c/dkN0P4iyD1lxnGIJRvbLrb7ioSsK7ZYVLlEtalpiMPZVNPKKwl/G/IKO7jdmJ2GyIMaddHau6mGvKFSKorklXUaiWtyn9Oqi/RWz3BvzC4OduvE1llmzwlh0ymPq/RZs+6tbXFPYMoiJlDUaaxyDm2uuKbw35jOj3uzuSMhY3lNJVSMUGx+pdwmt+HrdxY19cWwsmbHSkBO4KhrJL66H9ppCBd0a89xtgrliR1DFo4X2d0Bs2BWAe4W4u57syTWFba4ddy60lgd/M+w3FN4b8xXgwpgr6RFramwAVOKt4J3g9m6WztzaiMdG61om2JpTa4ub2XlDoYJuRbgNYBBzA2TMegw7IHRpyKUOP0/a2QX54oI8qK6/pbBBmNuyJkpr6tkapteXR8XiuundD5/KPuhhQLtSDEOw8WUJgXUlWyqmwSsAcPMNNcT449r0bjJvGbq5XLv9xn6mhysLTbzMn2ZR0gaZV/pCbhrYgsaapa+awsZATYbaG7vOMS1MOEW1vnPa6CjUbjRigWVlwW8Ao9EFPPn4ZuM9QtTWGL6eogsIau1hxWMGvStChKUY0zuNmAV6M1rqK2Weuy29m7S0FdzMaB+poszE2ZMXFkX8xoZxPS22JXkxZRcIWfpaealNRJLcZdpozmGNBecv5rnQfK3E2hW2t/kadxXIyGIuAfDIVcIp0bRVJiX0C0JsI9j0lQWoQjHqzA81wEZf4VXqhAVcQNrRK01zm6Y3i9+FVEgwV2dEn25jnlVX/rn/6v7MTCd2xuQ7OWTmA1nqdrxKYaSN7xyeYcVSdC1BZ1C+D69SuNdqJj/1ZkzE3yaOslNZxnC8SuFRuBXKWsXm9+hVtImpanSrbEFrwPcRvErhF+GXV1RTp1hKuuUq0UxyVgi5OrSRx2oxWrAXaVG2TrkFi0ev2xNwKTKYsMc2ZOi+v2thXpOBZTAbIvbkTXVmTLIWQaJ0M0FaAIauQzxKq22gMZIZMs5qZe7UNRq2jJMMQh1rK4ZdLOJEw658Fp45mEJZnNiWtejDAqp02r047DJJRYG6hX9FFR8F7cpa9MFHMtbHe7Eop1lQYiMEoFhgCTThww6QZnUddGOcpg+p8Jv4lV5IIZjsTQqW2BBYI3EqYs7FgPWI3imK8fytywOX4QuWONwvVIE62Upneye2VsXbVPjEA6ZTWcdi8PMWVwAEg2633IcDdKxar0aUyyhaCsclgQM2R8jr5NOAWUxUIz/f/k31fBUYMBTLOvf0vCT26Gtu5RDwztKnKTzlD5+Pxr+Xwk0slBJnOC4w3KekTXypxXhqIn1lkkuFoeaN7zT9Qqphk2q5YhFRJoCeEvzLcy3Gc2wKgHDauKRZAGpideodeHwhrjUU2cHBUzKEnrAxncuqIBU9MYi5wa3g+LC0VKM9+TgmYs2QNFaca7bgiQVk12F7LXo8kKRqwqPMl7R+tO945U4eYUp2Iuipg/ucaQPs2OOo2M36Qw2xRBzu7+8G12UzzopQHE29hdIZllfTxZ0h0+vZ8qdk1OT4vfAZisMUddJoy2zOKW5ie+/f4bM0pbUftD3ZTZ4s1PvlsbfQVknitvU82UoB3FhONzVs3xVbfIYaEhaxXLzyWwL4B5Mb6z2ACNGG0I8gypFbQWJtxdXE2vXfOYKbLUGGgffOl4jaZIbog7L/Fbw5Lh/FPRPYKzH1+PPzRWTGK0NsGIgc37eXsBdJuchtcEEaN1FFvssEYKyEXmmIVybFVCpOeyfFKFcx4Tv3olyYCAJIZcaZmzeGq1iUO1bFKI0ficyEi3aFIWPtuUsIkfEuOXqGXxxPK9JFWUSiOGJYYfT6MDpyTwkuo1NRAFIfSo7Je7favMNOvFTNlfpOI9vXBIK9xJIljUy8mu0zu/lew8pybnxbhH5dCoCB+Qo3Lc47hsAF10XUVmI3zz73HhprSQxo0MjPo1OgUMIAQ+O1LrxseiIiCMDNVMrv8CpfDEfF6j0wqDAWrzZk0ZA2JOibwyvDThi8sWbWe2VMsCnUg3B2BPFBFIvNfrYTkP0zzPQ5E9lL6e2mNULZxxEfQkT09+84/wM+EettrrLbjT3EbjO79aPMZbt7fG+4wly0G69z/+Mv1PH8pFLxPYFyIEmw7u/extWJ0WC8QpPsj88FEcaHU3DaTAOCNusaGDhKOyrQNmLPlibyTs+IK3qsVskHX8O6Zd2eg+wlooZerMsb38f2SrfQETZaH85PA2ySXOGjWP/aO6h5LIGBTIpBuNrtdvsQYGqiB4iTBJIPv5I8Bg2berV3t8YTV4BRd4MahsDs7+dg4D/x2jkXPzMozwB0vivrjbBWHdWvL8DcfVwVXuA2bbH3IoA55WuWnoZdjcyqGln+tVdbOiEaj0bN3H/YmGlEpo1Eo4aiv/peSxeMQKOG1D81Ae+wjhqi288AmO9+tdPTKPX7rVmfACTBRyNOD2JTXG+v+8zwgeTvKMAelFv6HJHcA0H/2jvkyyOg8DEqgUG19F/gzl/w3MrARieZ3MWlcOl+3n8YDs8vdIhNJNa2XdwmuY0rRCYGQTHRGrQ3w479vNgGqwiamGATRKtgW+R+/NfsshkzZsyYMWPGjBkzZsyYMWPGjBkzZsyYMWPGjBkz/uf4D7peCmU6Yzc0AAAAAElFTkSuQmCC"
              alt="logo"
              className="w-12 h-12 object-contain opacity-90 hover:scale-110 transition-transform duration-300"
            />
          </div>

          <p className="text-sm text-gray-500 mt-1">
            Join our trusted network and access legal support resources.
          </p>

          {/* Role Selector */}
          <div className="mt-6">
            <label className="block text-sm text-gray-700 mb-1">
              Select Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full border border-gray-300 bg-white rounded-xl p-3 shadow-sm"
            >
              <option value="CITIZEN">Citizen</option>
              <option value="LAWYER">Lawyer</option>
              <option value="NGO">NGO</option>
            </select>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 text-sm text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg">
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            {/* ----------------------- CITIZEN FORM ----------------------- */}
            {role === "CITIZEN" && (
              <>
                <Input
                  icon={<FiUser />}
                  label="Full Name"
                  name="name"
                  required
                />
                <Input
                  icon={<FiHash />}
                  label="Aadhar Number"
                  name="aadhar"
                  required
                />
                <Input
                  icon={<FiMail />}
                  label="Email"
                  name="email"
                  type="email"
                  required
                />
                <Input
                  icon={<FiPhone />}
                  label="Mobile Number"
                  name="phone"
                  required
                />
                <Input
                  icon={<MdDateRange />}
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  required
                />
                <Input
                  icon={<FiLock />}
                  label="Password"
                  name="password"
                  type="password"
                  required
                />
                <Input
                  icon={<FiLock />}
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  required
                />
              </>
            )}

            {/* ----------------------- LAWYER FORM ----------------------- */}
            {role === "LAWYER" && (
              <>
                <h3 className="text-lg font-semibold text-gray-800 mt-6">
                  General Details
                </h3>

                <Input
                  icon={<FiUser />}
                  label="Full Name"
                  name="name"
                  required
                />
                <Input icon={<FiMail />} label="Email" name="email" required />
                <Input
                  icon={<FiPhone />}
                  label="Mobile Number"
                  name="phone"
                  required
                />
                <Input
                  icon={<FiHash />}
                  label="Aadhar Number"
                  name="aadhar"
                  required
                />

                <Input
                  icon={<MdUploadFile />}
                  label="Upload Aadhar ID Proof"
                  name="aadharProof"
                  type="file"
                  required
                />

                <h3 className="text-lg font-semibold text-gray-800 mt-6">
                  Lawyer Identification
                </h3>

                <Input
                  icon={<FiHash />}
                  label="Bar Council ID"
                  name="barId"
                  required
                />

                {/* BAR STATE */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Bar Council State
                  </label>
                  <select
                    name="barState"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-3 shadow-sm"
                    required
                  >
                    <option>Select State</option>
                    {states.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* SPECIALIZATION */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Specialization
                  </label>
                  <select
                    name="specialization"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-3 shadow-sm"
                    required
                  >
                    <option>Select Specialization</option>
                    {specializations.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <Input
                  icon={<MdUploadFile />}
                  label="Upload Bar Council Certificate"
                  name="barCert"
                  type="file"
                  required
                />
                <Input
                  icon={<FiHash />}
                  label="Years of Experience"
                  name="experience"
                  type="number"
                  required
                />

                <h3 className="text-lg font-semibold text-gray-800 mt-6">
                  Location Details
                </h3>

                <Input
                  icon={<FiMapPin />}
                  label="Office Address"
                  name="address"
                  required
                />
                <Input
                  icon={<MdPlace />}
                  label="District"
                  name="district"
                  required
                />
                <Input icon={<MdPlace />} label="City" name="city" required />

                {/* State */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    State
                  </label>
                  <select
                    name="state"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-3 shadow-sm"
                    required
                  >
                    <option>Select State</option>
                    {states.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <Input
                  icon={<FiLock />}
                  label="Password"
                  name="password"
                  type="password"
                  required
                />
                <Input
                  icon={<FiLock />}
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  required
                />
              </>
            )}

            {/* ----------------------- NGO FORM ----------------------- */}
            {role === "NGO" && (
              <>
                <Input
                  icon={<FiUser />}
                  label="Name of NGO"
                  name="ngoName"
                  required
                />

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Type of NGO
                  </label>
                  <select
                    name="ngoType"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-3 shadow-sm"
                    required
                  >
                    <option>Select NGO Type</option>
                    {ngoTypes.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <Input
                  icon={<FiHash />}
                  label="Registration Number"
                  name="regNo"
                  required
                />
                <Input
                  icon={<MdUploadFile />}
                  label="Registration Certificate"
                  name="regCert"
                  type="file"
                  required
                />

                <Input
                  icon={<FiPhone />}
                  label="Contact Number"
                  name="contact"
                  required
                />
                <Input
                  icon={<FiMail />}
                  label="Official Email ID"
                  name="officialEmail"
                  required
                />

                <Input
                  icon={<FiMapPin />}
                  label="Office Address"
                  name="address"
                  required
                />
                <Input
                  icon={<MdPlace />}
                  label="District"
                  name="district"
                  required
                />
                <Input icon={<MdPlace />} label="City" name="city" required />

                {/* NGO State */}
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    State
                  </label>
                  <select
                    name="state"
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl p-3 shadow-sm"
                    required
                  >
                    <option>Select State</option>
                    {states.map((s) => (
                      <option key={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <Input
                  icon={<FiHash />}
                  label="Pincode"
                  name="pincode"
                  required
                />
                <Input
                  icon={<FiLock />}
                  label="Password"
                  name="password"
                  type="password"
                  required
                />
                <Input
                  icon={<FiLock />}
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  required
                />
              </>
            )}

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-lg"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-4 text-center text-gray-600 text-sm">
            Already have an account?
            <Link to="/login" className="ml-1 text-blue-700 font-semibold">
              Sign In
            </Link>
          </p>

          <div className="mt-4 text-center text-xs text-gray-500">
            Need urgent help? Call our helpline:{" "}
            <span className="font-semibold">1800-000-000</span>
          </div>
        </div>
      </div>
    </section>
  );
}



// import React from "react"
// import { useForm } from "react-hook-form"
// import { Heart, User, Mail, Lock, Phone, Calendar, Users } from "lucide-react"
// import { validation } from "./validation"
// import DoctorForm from "./DoctorForm"
// import PatientForm from "./PatientForm"
// import { userTypes } from "../../enums/useType"

// const SignupForm = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     reset,
//   } = useForm()

//   const [userType, setUserType] = React.useState("")

//   const handleRoleChange = (userType) => {
//     setUserType(userType)
//     // Reset specialty if switching roles
//     setValue("specialty", "")
//     reset()
//   }

//   const onSubmit = async (data) => {
//     const validationError = validation(data)
//     if (validationError.length > 0) {
//       alert(validationError.join("\n"))
//       return
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/users/register", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       })

//       const responseData = await res.json()
//       if (res.ok) {
//         alert("Account created successfully!")
//         // Redirect or reset form
//       } else {
//         alert(responseData.message || "Something went wrong")
//       }
//     } catch (err) {
//       console.error(err)
//       alert("Error while signing up.")
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-pink-50 py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-md mx-auto">
//         <div className="bg-white rounded-xl shadow-xl overflow-hidden">
//           {/* Header with heart icon */}
//           <div className="bg-gradient-to-r from-pink-400 to-blue-400 px-6 py-8 text-white text-center">
//             <div className="flex justify-center mb-3">
//               <Heart className="h-12 w-12 text-white animate-pulse" fill="white" />
//             </div>
//             <h2 className="text-2xl font-bold">Cardiology Department</h2>
//             <p className="mt-1 text-pink-100">Create your account</p>
//           </div>

//           <div className="px-6 py-8">
//             {/* Role selection */}
//             <div className="mb-6">
//               <div className="grid grid-cols-2 gap-4">
//                 <button
//                   type="button"
//                   className={`flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-all ${
//                     userType === userTypes.doctor
//                       ? "border-blue-500 bg-blue-50 text-blue-700"
//                       : "border-gray-200 hover:border-blue-200 hover:bg-blue-50"
//                   }`}
//                   onClick={() => handleRoleChange(userTypes.doctor)}
//                 >
//                   <User className="mr-2 h-5 w-5" />
//                   <span className="font-medium">Doctor</span>
//                 </button>
//                 <button
//                   type="button"
//                   className={`flex items-center justify-center px-4 py-3 rounded-lg border-2 transition-all ${
//                     userType === userTypes.patient
//                       ? "border-pink-500 bg-pink-50 text-pink-700"
//                       : "border-gray-200 hover:border-pink-200 hover:bg-pink-50"
//                   }`}
//                   onClick={() => handleRoleChange(userTypes.patient)}
//                 >
//                   <Users className="mr-2 h-5 w-5" />
//                   <span className="font-medium">Patient</span>
//                 </button>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="space-y-5">
//                 {/* Name fields in a row */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label htmlFor="first_name" className="block text-sm font-medium text-gray-700 mb-1">
//                       First Name
//                     </label>
//                     <div className="relative">
//                       <input
//                         {...register("first_name", { required: "First name is required" })}
//                         type="text"
//                         id="first_name"
//                         className={`w-full px-4 py-2 rounded-lg border ${
//                           errors.first_name ? "border-red-500" : "border-gray-300"
//                         } focus:outline-none focus:ring-2 focus:ring-blue-300`}
//                       />
//                     </div>
//                     {errors.first_name && <p className="mt-1 text-sm text-red-600">{errors.first_name.message}</p>}
//                   </div>
//                   <div>
//                     <label htmlFor="last_name" className="block text-sm font-medium text-gray-700 mb-1">
//                       Last Name
//                     </label>
//                     <div className="relative">
//                       <input
//                         {...register("last_name", { required: "Last name is required" })}
//                         type="text"
//                         id="last_name"
//                         className={`w-full px-4 py-2 rounded-lg border ${
//                           errors.last_name ? "border-red-500" : "border-gray-300"
//                         } focus:outline-none focus:ring-2 focus:ring-blue-300`}
//                       />
//                     </div>
//                     {errors.last_name && <p className="mt-1 text-sm text-red-600">{errors.last_name.message}</p>}
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="middle_name" className="block text-sm font-medium text-gray-700 mb-1">
//                     Middle Name
//                   </label>
//                   <div className="relative">
//                     <input
//                       {...register("middle_name")}
//                       type="text"
//                       id="middle_name"
//                       className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
//                     />
//                   </div>
//                 </div>

//                 <div>
//                   <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
//                     Email
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Mail className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       {...register("email", {
//                         required: "Email is required",
//                         pattern: /^[^@]+@[^@]+\.[^@]+$/,
//                       })}
//                       type="email"
//                       id="email"
//                       placeholder="your@email.com"
//                       className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
//                         errors.email ? "border-red-500" : "border-gray-300"
//                       } focus:outline-none focus:ring-2 focus:ring-blue-300`}
//                     />
//                   </div>
//                   {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
//                 </div>

//                 <div>
//                   <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
//                     Password
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       {...register("password", { required: "Password is required" })}
//                       type="password"
//                       id="password"
//                       placeholder="•••••••••••"
//                       className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
//                         errors.password ? "border-red-500" : "border-gray-300"
//                       } focus:outline-none focus:ring-2 focus:ring-blue-300`}
//                     />
//                   </div>
//                   {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
//                 </div>

//                 <div>
//                   <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
//                     Confirm Password
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Lock className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       {...register("confirmPassword", { required: "Please confirm your password" })}
//                       type="password"
//                       id="confirmPassword"
//                       placeholder="•••••••••••"
//                       className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
//                         errors.confirmPassword ? "border-red-500" : "border-gray-300"
//                       } focus:outline-none focus:ring-2 focus:ring-blue-300`}
//                     />
//                   </div>
//                   {errors.confirmPassword && (
//                     <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
//                   )}
//                 </div>

//                 <div>
//                   <label htmlFor="phone_number" className="block text-sm font-medium text-gray-700 mb-1">
//                     Phone Number
//                   </label>
//                   <div className="relative">
//                     <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                       <Phone className="h-5 w-5 text-gray-400" />
//                     </div>
//                     <input
//                       {...register("phone_number", { required: "Phone number is required" })}
//                       type="tel"
//                       id="phone_number"
//                       className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
//                         errors.phone_number ? "border-red-500" : "border-gray-300"
//                       } focus:outline-none focus:ring-2 focus:ring-blue-300`}
//                     />
//                   </div>
//                   {errors.phone_number && <p className="mt-1 text-sm text-red-600">{errors.phone_number.message}</p>}
//                 </div>

//                 <div className="grid grid-cols-2 gap-4">
//                   <div>
//                     <label htmlFor="date_of_birth" className="block text-sm font-medium text-gray-700 mb-1">
//                       Date of Birth
//                     </label>
//                     <div className="relative">
//                       <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                         <Calendar className="h-5 w-5 text-gray-400" />
//                       </div>
//                       <input
//                         {...register("date_of_birth", { required: "Date of birth is required" })}
//                         type="date"
//                         id="date_of_birth"
//                         className={`w-full pl-10 pr-4 py-2 rounded-lg border ${
//                           errors.date_of_birth ? "border-red-500" : "border-gray-300"
//                         } focus:outline-none focus:ring-2 focus:ring-blue-300`}
//                       />
//                     </div>
//                     {errors.date_of_birth && (
//                       <p className="mt-1 text-sm text-red-600">{errors.date_of_birth.message}</p>
//                     )}
//                   </div>

//                   <div>
//                     <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
//                       Gender
//                     </label>
//                     <select
//                       {...register("gender", { required: "Gender is required" })}
//                       id="gender"
//                       className={`w-full px-4 py-2 rounded-lg border ${
//                         errors.gender ? "border-red-500" : "border-gray-300"
//                       } focus:outline-none focus:ring-2 focus:ring-blue-300`}
//                     >
//                       <option value="">Select Gender</option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                     </select>
//                     {errors.gender && <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>}
//                   </div>
//                 </div>

//                 {userType === userTypes.doctor && (
//                   <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
//                     <h3 className="text-blue-700 font-medium mb-3 flex items-center">
//                       <Heart className="mr-2 h-5 w-5" /> Doctor Information
//                     </h3>
//                     <DoctorForm register={register} errors={errors} />
//                   </div>
//                 )}

//                 {userType === userTypes.patient && (
//                   <div className="p-4 border border-pink-200 bg-pink-50 rounded-lg">
//                     <h3 className="text-pink-700 font-medium mb-3 flex items-center">
//                       <Heart className="mr-2 h-5 w-5" /> Patient Information
//                     </h3>
//                     <PatientForm register={register} errors={errors} />
//                   </div>
//                 )}

//                 <button
//                   type="submit"
//                   className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-medium rounded-lg shadow-md hover:from-pink-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-all duration-300"
//                 >
//                   <div className="flex items-center justify-center">
//                     <Heart className="mr-2 h-5 w-5" />
//                     Sign Up
//                   </div>
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>

//         <div className="text-center mt-6 text-gray-600">
//           Already have an account?{" "}
//           <a href="/login" className="text-blue-500 hover:text-blue-700 font-medium">
//             Sign In
//           </a>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default SignupForm

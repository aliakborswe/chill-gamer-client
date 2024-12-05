import Wrapper from "../common/Wrapper";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Swal from "sweetalert2";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProviders";
import { AuthInfo } from "@/utils/type";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  photoURL: z.string().url({
    message: "Please enter a valid URL for the profile photo.",
  }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters." })
    .refine(
      (value) => /[A-Z]/.test(value), // Must have at least one uppercase letter
      { message: "Password must contain at least one uppercase letter." }
    )
    .refine(
      (value) => /[a-z]/.test(value), // Must have at least one lowercase letter
      { message: "Password must contain at least one lowercase letter." }
    ),
});

const Register = () => {
  const { user, registerUser } = useContext(AuthContext) as any as AuthInfo;

 
  // Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      photoURL: "",
      password: "",
    },
  });
  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    const email = values.email as string;
    const password = values.password as string;
    if(registerUser){
        registerUser(email, password)
          .then((result) => {
            console.log(result.user);
            fetch("http://localhost:8080/api/v1/user", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name: values.name,
                email: result.user.email,
                photoURL: values.photoURL,
                password: values.password,
              }),
            }).then(()=>{
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "User created successfully",
                  showConfirmButton: false,
                  timer: 1500,
                });
  
            }).catch(err =>{
                Swal.fire({
                  position: "center",
                  icon: "error",
                  title: err.message,
                  showConfirmButton: false,
                  timer: 1500,
                });
            })
          })
          .catch((err) => {
            Swal.fire({
              position: "center",
              icon: "error",
              title: err.message,
              showConfirmButton: false,
              timer: 1500,
            });
          });
    }
  }

  return (
    <div>
      <Wrapper className='flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0'>
        <DotLottieReact
          src='https://lottie.host/297c1a07-a0bb-4c42-a1a3-16a67e20a863/jY4y2I5TLz.lottie'
          loop
          autoplay
          className='md:w-1/2 aspect-square'
        />
        <div className='md:w-1/2'>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Your Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Your email' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='photoURL'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Photo URL</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter Your Photo url' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input placeholder='Enter password' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type='submit' className='w-full'>
                Submit
              </Button>
            </form>
          </Form>
          <p className='mt-8 text-start text-muted-foreground'>
            Have an account?{" "}
            <Link
              to='/login'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
            >
              Please Login
            </Link>
          </p>
        </div>
      </Wrapper>
    </div>
  );
};

export default Register;

import Wrapper from "../common/Wrapper";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Link, useLocation, useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "@/providers/AuthProviders";
import { AuthInfo } from "@/utils/type";
import SocialLogin from "./SocialLogin";
import { toast } from "react-toastify";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
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

const Login = () => {
  const { loginWithEmailPass } = useContext(AuthContext) as any as AuthInfo;

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  // Define form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  // Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    loginWithEmailPass(values.email, values.password)
      .then(() => {
        fetch("http://localhost:8080/api/v1/user", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email: values.email}),
        }).then(()=>{
            toast.success("login Success!");
        })
        navigate(from, { replace: true });
        form.reset();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  return (
    <div>
      <Wrapper className='flex flex-col md:flex-row items-center justify-center gap-4 '>
        <DotLottieReact
          src='https://lottie.host/ee6124ae-6e2d-4e49-990e-c53070a21056/lXIvBH3Gdn.lottie'
          loop
          autoplay
          className='md:w-1/2 aspect-square'
        />
        <div className='md:w-1/2'>
          <SocialLogin />
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='space-y-8 border-t-2 border-accent pt-6'
            >
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
                Login
              </Button>
            </form>
          </Form>
          <p className='mt-8 text-start text-muted-foreground'>
            Not a member?{" "}
            <Link
              to='/register'
              className='font-semibold leading-6 text-indigo-600 hover:text-indigo-500'
            >
              Please register first
            </Link>
          </p>
        </div>
      </Wrapper>
    </div>
  );
};

export default Login;

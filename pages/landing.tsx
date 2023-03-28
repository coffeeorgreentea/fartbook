import Banner from "@/components/fart/Banner";
import Blog from "@/components/fart/Blog";
import Faq from "@/components/fart/Faq";
import Features from "@/components/fart/Features";
import Footer from "@/components/fart/Footer";
import Hero from "@/components/fart/Hero";
import Team from "@/components/fart/Team";
import Testimonials from "@/components/fart/Testimonials";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";

export default function landingPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <Hero />
      <Features />
      <Testimonials />
      <Team />
      <Faq />
      <Blog />
      {/* <Banner /> */}
      <Footer />
    </div>
  );
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  return {
    props: {
      data: "",
    },
  };
}

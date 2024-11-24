import Head from "next/head";
import Image from "next/image";
import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";

// import { loadEntrys } from "../lib/load-posts";

import Announcement from "@/components/announcement";
import Feed from "@/components/feed";
import { dataPosts } from "@/models/postsdata";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  const posts = dataPosts;
  // const [posts, setEntrys] = useState(postData);
  return (
    <>
      <Head>
        <title>Community CMS</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section>
        <Announcement></Announcement>
        <Feed posts={posts}></Feed>
      </section>
    </>
  );
}


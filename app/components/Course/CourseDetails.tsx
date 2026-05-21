"use client";

import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoCheckmarkDoneOutline, IoCloseOutline } from "react-icons/io5";
import { format } from "timeago.js";
import CourseContentList from "../Course/CourseContentList";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "../Payment/CheckOutForm";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import Image from "next/image";
import { VscVerifiedFilled } from "react-icons/vsc";
import Loader from "../Loader/Loader";

type Props = {
  data: any;
  stripePromise: any;
  clientSecret: string;
  setRoute: any;
  setOpen: any;
};

const CourseDetails = ({
  data,
  stripePromise,
  clientSecret,
  setRoute,
  setOpen: openAuthModal,
}: Props) => {
  // ✅ FIXED USER QUERY
  const { data: userData, refetch } = useLoadUserQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });

  const [user, setUser] = useState<any>();
  const [open, setOpen] = useState(false);

  // ✅ LOADING
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUser(userData?.user);
  }, [userData]);

  // ✅ FULL SCREEN LOADER
  if (loading) {
    return <Loader />;
  }

  // ✅ DISCOUNT
  const discount =
    data?.estimatedPrice && data?.price
      ? ((data.estimatedPrice - data.price) / data.estimatedPrice) * 100
      : 0;

  const discountPercent = discount.toFixed(0);

  // ✅ PURCHASED CHECK
  const isPurchased =
    user && user?.courses?.find((item: any) => item._id === data?._id);

  // ✅ ENROLL / BUY
  const handleOrder = async () => {
    // LOGIN CHECK
    if (!user) {
      setRoute("Login");
      openAuthModal(true);
      return;
    }

    // ✅ FREE COURSE
    if (data?.price === 0) {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:8000/api/v1/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            courseId: data._id,
          }),
        });

        const result = await res.json();

        if (result.success) {
          // ✅ REFETCH USER
          await refetch();

          // ✅ FULL PAGE RELOAD
          window.location.reload();
        }
      } catch (error) {
        console.log("Enroll error:", error);
      } finally {
        setLoading(false);
      }
    }

    // ✅ PAID COURSE
    else {
      setOpen(true);
    }
  };

  return (
    <div>
      <div className="w-[90%] m-auto py-5">
        <div className="flex flex-col-reverse 800px:flex-row">
          {/* LEFT SIDE */}
          <div className="w-full 800px:w-[65%] pr-5">
            {/* TITLE */}
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              {data?.name}
            </h1>

            {/* RATINGS */}
            <div className="flex justify-between pt-3 text-black dark:text-white">
              <div className="flex items-center text-black dark:text-white">
                <Ratings rating={data?.ratings} />

                <h5 className="pl-2 text-black dark:text-white">
                  {data?.reviews?.length} Reviews
                </h5>
              </div>

              <h5>{data?.purchased} Students</h5>
            </div>

            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What you will learn from this course?
            </h1>

            {/* BENEFITS */}
            {data?.benefits?.map((item: any, i: number) => (
              <div key={i} className="flex py-2 text-black dark:text-white">
                <IoCheckmarkDoneOutline
                  size={20}
                  className="text-black dark:text-white"
                />

                <p className="pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}

            <br />
            <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
              What are the prerequisites for starting this course?
            </h1>

            {/* PREREQUISITES */}
            {data?.prerequisites?.map((item: any, i: number) => (
              <div key={i} className="flex py-2">
                <IoCheckmarkDoneOutline
                  size={20}
                  className="text-black dark:text-white"
                />

                <p className="pl-2 text-black dark:text-white">{item.title}</p>
              </div>
            ))}
            <br />
            <div>
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Course Overview
              </h1>
              <CourseContentList data={data?.courseData} isDemo={true} />
            </div>
            <br />
            <br />

            {/* COURSE CONTENT */}
            {/* <CourseContentList data={data?.courseData || []} isDemo={true} /> */}

            {/* DESCRIPTION */}

            <div className="w-full">
              <h1 className="text-[25px] font-Poppins font-[600] text-black dark:text-white">
                Course Details
              </h1>
              <p className="text-[18px] mt-[20px] whitespace-pre-line w-full overflow-hidden text-black dark:text-white">
                {data.description}
              </p>
            </div>
            {/* <p className="text-black dark:text-white">{data?.description}</p> */}

            <br />
            <div className="w-full">
              <div className="800px:flex items-center">
                <Ratings rating={data?.ratings} />
                <div className="mb-2 800px:mb-[unset]" />
                <h5 className="text-[25px] font-Poppins text-black dark:text-white">
                  {Number.isInteger(data?.ratings)
                    ? data?.ratings.toFixed(1)
                    : data?.ratings.toFixed(2)}{" "}
                  Course Rating • {data?.reviews?.length} Reviews
                </h5>
              </div>
              <br />
              {(data?.reviews && [...data.reviews].reverse()).map(
                (item: any, index: number) => (
                  <div className="w-full pb-4" key={index}>
                    <div className="flex">
                      <div className="w-[50px] h-[50px]">
                        <Image
                          src={
                            item.user.avatar
                              ? item.user.avatar.url
                              : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                          }
                          width={50}
                          height={50}
                          alt=""
                          className="w-[50px] h-[50px] rounded-full object-cover"
                        />
                      </div>
                      <div className="hidden 800px:block pl-2">
                        <div className="flex items-center">
                          <h5 className="text-[18px] pr-2 text-black dark:text-white">
                            {item.user.name}
                          </h5>
                          <Ratings rating={item.rating} />
                        </div>
                        <p className="text-black dark:text-white">
                          {item.comment}
                        </p>
                        <small className="text-[#000000d1] dark:text-[#ffffff83]">
                          {format(item.createdAt)} •
                        </small>
                      </div>
                      <div className="pl-2 flex 800px:hidden items-center">
                        <h5 className="text-[18px] pr-2 text-black dark:text-white">
                          {item.user.name}
                        </h5>
                        <Ratings rating={item.rating} />
                      </div>
                    </div>
                    {item.commentReplies.map((i: any, index: number) => (
                      <div className="w-full flex 800px:ml-16 my-5" key={index}>
                        <div className="w-[50px] h-[50px]">
                          <Image
                            src={
                              i.user.avatar
                                ? i.user.avatar.url
                                : "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                            }
                            width={50}
                            height={50}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full object-cover"
                          />
                        </div>
                        <div className="pl-2">
                          <div className="flex items-center">
                            <h5 className="text-[20px]">{i.user.name}</h5>{" "}
                            <VscVerifiedFilled className="text-[#0095F6] ml-2 text-[20px]" />
                          </div>
                          <p>{i.comment}</p>
                          <small className="text-[#ffffff83]">
                            {format(i.createdAt)} •
                          </small>
                        </div>
                      </div>
                    ))}
                  </div>
                ),
              )}
            </div>

            {/* REVIEWS */}
            {/* {(data?.reviews && [...data.reviews].reverse())?.map(
              (item: any, index: number) => (
                <div key={index} className="my-4 text-black dark:text-white">
                  <div className="flex">
                    <Image
                      src={
                        item.user.avatar?.url ||
                        "https://res.cloudinary.com/dshp9jnuy/image/upload/v1665822253/avatars/nrxsg8sd9iy10bbsoenn.png"
                      }
                      width={50}
                      height={50}
                      alt=""
                    />

                    <div className="pl-2">
                      <div className="flex items-center">
                        <h5>{item.user.name}</h5>

                        <VscVerifiedFilled className="ml-1" color="red" />
                      </div>

                      <Ratings rating={item.rating} />

                      <p>{item.comment}</p>

                      <small>{format(item.createdAt)}</small>
                    </div>
                  </div>
                </div> */}
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full 800px:w-[35%]">
            <div className="sticky top-[100px]">
              {/* VIDEO PLAYER */}
              <CoursePlayer videoUrl={data?.demoUrl} title={data?.title} />

              {/* PRICE */}
              <h1 className="pt-5 text-[25px] font-[600] text-black dark:text-white">
                {data?.price === 0 ? "Free" : `${data?.price}$`}
              </h1>

              {/* ESTIMATED PRICE */}
              <h5 className="line-through opacity-70 text-black dark:text-white">
                {data?.estimatedPrice}$
              </h5>

              {/* DISCOUNT */}
              <h4 className="text-red-600 font-[600] text-black dark:text-white">
                {discountPercent}% Off
              </h4>
              {/* BUTTON */}
              {/* {isPurchased ? (
                <Link
                  href={`/course-access/${data?._id}`}
                  className={`${styles.button} !bg-red-600 hover:!bg-red-700 text-white text-center`}
                >
                  Enter to Course
                </Link>
              ) : (
                <div
                  onClick={handleOrder}
                  className={`${styles.button} !bg-red-600 hover:!bg-red-700 text-white text-center cursor-pointer`}
                >
                  {data?.price === 0
                    ? "Enroll the Course"
                    : `Buy Now ${data?.price}$`}
                </div> */}

              {isPurchased ? (
                <Link
                  href={`/course-access/${data?._id}`}
                  className={`${styles.button} !bg-red-600 hover:!bg-red-700 text-white text-center`}
                >
                  Enter to Course
                </Link>
              ) : (
                <div
                  onClick={handleOrder}
                  className={`${styles.button} !bg-red-600 hover:!bg-red-700 text-white text-center cursor-pointer`}
                >
                  {data?.price === 0
                    ? "Enroll the Course"
                    : `Buy Now ${data?.price}$`}
                </div>
              )}
              <br />
              <p className="pb-1 text-black dark:text-white">
                • Source code included
              </p>
              <p className="pb-1 text-black dark:text-white">
                • Full lifetime access
              </p>
              <p className="pb-1 text-black dark:text-white">
                • Certificate of completion
              </p>
              <p className="pb-3 800px:pb-1 text-black dark:text-white">
                • Premium Support
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PAYMENT MODAL */}
      {open && data?.price !== 0 && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/30 flex justify-center items-center z-[9999]">
          <div className="bg-white p-3 rounded-xl w-[500px]">
            <IoCloseOutline
              size={40}
              className="cursor-pointer"
              onClick={() => setOpen(false)}
            />

            {stripePromise && clientSecret && (
              <Elements
                stripe={stripePromise}
                options={{
                  clientSecret,
                }}
              >
                <CheckOutForm
                  setOpen={setOpen}
                  data={data}
                  user={user}
                  refetch={refetch}
                />
              </Elements>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseDetails;

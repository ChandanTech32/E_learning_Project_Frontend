"use client";

import { styles } from "@/app/styles/style";
import CoursePlayer from "@/app/utils/CoursePlayer";
import Ratings from "@/app/utils/Ratings";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import {
  IoCheckmarkDoneOutline,
  IoCloseOutline,
} from "react-icons/io5";
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
  const { data: userData, refetch } =
    useLoadUserQuery(undefined, {
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
      ? ((data.estimatedPrice - data.price) /
          data.estimatedPrice) *
        100
      : 0;

  const discountPercent = discount.toFixed(0);

  // ✅ PURCHASED CHECK
  const isPurchased =
    user &&
    user?.courses?.find(
      (item: any) => item._id === data?._id
    );

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

        const res = await fetch(
          "http://localhost:8000/api/v1/create-order",
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              courseId: data._id,
            }),
          }
        );

        const result = await res.json();

        if (result.success) {

          // ✅ REFETCH USER
          await refetch();

          // ✅ FULL PAGE RELOAD
          window.location.reload();
        }

      } catch (error) {

        console.log(
          "Enroll error:",
          error
        );

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
            <h1 className="text-[25px] font-[600] text-black dark:text-white">
              {data?.name}
            </h1>

            {/* RATINGS */}
            <div className="flex justify-between pt-3 text-black dark:text-white">

              <div className="flex items-center text-black dark:text-white">

                <Ratings
                  rating={data?.ratings}
                />

                <h5 className="pl-2 text-black dark:text-white">
                  {data?.reviews?.length} Reviews
                </h5>

              </div>

              <h5>
                {data?.purchased} Students
              </h5>

            </div>

            <br />

            {/* BENEFITS */}
            {data?.benefits?.map(
              (item: any, i: number) => (

                <div
                  key={i}
                  className="flex py-2 text-black dark:text-white"
                >

                  <IoCheckmarkDoneOutline
                    size={20}
                    className="text-black dark:text-white"
                  />

                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>

                </div>
              )
            )}

            <br />

            {/* PREREQUISITES */}
            {data?.prerequisites?.map(
              (item: any, i: number) => (

                <div
                  key={i}
                  className="flex py-2"
                >

                  <IoCheckmarkDoneOutline
                    size={20}
                    className=
                     "text-black dark:text-white"
                  />

                  <p className="pl-2 text-black dark:text-white">
                    {item.title}
                  </p>

                </div>
              )
            )}

            <br />

            {/* COURSE CONTENT */}
            <CourseContentList
              data={data?.courseData || []}
              isDemo={true}
            />

            <br />

            {/* DESCRIPTION */}
            <p className="text-black dark:text-white">{data?.description}</p>

            <br />

            {/* REVIEWS */}
            {(data?.reviews &&
              [...data.reviews].reverse())?.map(
              (item: any, index: number) => (

                <div
                  key={index}
                  className="my-4 text-black dark:text-white"
                >

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

                        <h5>
                          {item.user.name}
                        </h5>

                        <VscVerifiedFilled
                          className="ml-1"
                          color="red"
                        />

                      </div>

                      <Ratings
                        rating={item.rating}
                      />

                      <p>
                        {item.comment}
                      </p>

                      <small>
                        {format(
                          item.createdAt
                        )}
                      </small>

                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="w-full 800px:w-[35%]">

            <div className="sticky top-[100px]">

              {/* VIDEO PLAYER */}
              <CoursePlayer
                videoUrl={data?.demoUrl}
                title={data?.title}
              />

              {/* PRICE */}
              <h1 className="pt-5 text-[25px] font-[600] text-black dark:text-white">

                {data?.price === 0
                  ? "Free"
                  : `${data?.price}$`}

              </h1>

              {/* ESTIMATED PRICE */}
              <h5 className="line-through opacity-70 text-black dark:text-white">
                {data?.estimatedPrice}$
              </h5>

              {/* DISCOUNT */}
              <h4 className="text-red-600 font-[600] text-black dark:text-white">
                {discountPercent}% Off
              </h4>

              <br />

              {/* BUTTON */}
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

            {stripePromise &&
              clientSecret && (

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
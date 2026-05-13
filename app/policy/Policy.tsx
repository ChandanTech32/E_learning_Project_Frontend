import React from "react";
import { styles } from "../styles/style";

type Props = {};

const Policy = (props: Props) => {
  return (
    <div>
      <div
        className={
          "w-[95%] 800px:w-[92%] m-auto py-2 text-black dark:text-white px-3"
        }
      >
        <h1 className={`${styles.title} !text-start pt-2`}>
          Platform Terms and Condition
        </h1>

        <ul style={{ listStyle: "unset", marginLeft: "15px" }}>
          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Welcome to our e-learning platform. By accessing or using this
            platform, you agree to comply with and be bound by these Terms and
            Conditions. If you do not agree, please do not use our services.
          </p>

          <br />

          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Users must create an account to access certain features. You are
            responsible for maintaining the confidentiality of your account
            credentials and for all activities that occur under your account.
          </p>

          <br />

          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            All course content, including videos, text, graphics, and materials,
            is the intellectual property of the platform or its instructors. You
            may not copy, distribute, or reproduce any content without prior
            permission.
          </p>

          <br />

          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Payments made for courses are non-refundable unless stated
            otherwise. We reserve the right to change pricing, offers, or course
            availability at any time without prior notice.
          </p>

          <br />

          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            Users are expected to behave respectfully within the platform. Any
            misuse, abuse, or violation of guidelines may result in account
            suspension or termination without notice.
          </p>

          <br />

          <p className="py-2 ml-[-15px] text-[16px] font-Poppins leading-8 whitespace-pre-line">
            We do not guarantee uninterrupted access to the platform. Technical
            issues, updates, or maintenance may temporarily affect availability.
          </p>
        </ul>
      </div>
    </div>
  );
};

export default Policy;

import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import OtpInput from "react-otp-input";
import { FiPhone } from "react-icons/fi";
import { HiOutlineMail } from "react-icons/hi";
import { LuWallet } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { Button } from "../../common/buttons";
import { TextInput } from "..";

// TypeScript interfaces
interface AuthModalProps {
  isOpen: boolean;
  handleClose: () => void;
}

interface AuthState {
  step: number;
  contactMethod: "email" | "phone";
  emailOrPhone: string;
  otp: string;
  isOtpSent: boolean;
}

const AuthModal = ({ isOpen, handleClose }: AuthModalProps) => {
  const [authState, setAuthState] = useState<AuthState>({
    step: 1,
    contactMethod: "email",
    emailOrPhone: "",
    otp: "",
    isOtpSent: false,
  });

  // Handlers
  const handleStepChange = (newStep: number) => {
    setAuthState((prevState) => ({ ...prevState, step: newStep }));
  };

  const handleStateChange = (changes: Partial<AuthState>) => {
    setAuthState((prevState) => ({ ...prevState, ...changes }));
  };

  const onCloseHandler = () => {
    handleClose();
    handleStateChange({
      step: 1,
      emailOrPhone: "",
      otp: "",
      isOtpSent: false,
    });
  };

  const handleSelectContactMethod = (method: "email" | "phone") => {
    handleStateChange({ contactMethod: method });
    handleStepChange(authState.step + 1);
  };

  const handleSendVerificationCode = () => {
    // Add logic for data validation and sending verification code
    handleStateChange({ isOtpSent: true });
  };

  const handleOtpVerification = () => {
    // Handle OTP Verification
    handleStepChange(authState.step + 1);
  };

  const handleConnectWallet = () => {
    // Handle wallet connection
    handleStepChange(authState.step + 1);
  };

  // Render step content
  const renderStepContent = () => {
    const { step, contactMethod, emailOrPhone, otp, isOtpSent } = authState;

    switch (step) {
      case 1:
        return (
          <div className="flex flex-col gap-4">
            <Button onClick={() => handleSelectContactMethod("email")}>
              <div className="flex items-center justify-center gap-4">
                <HiOutlineMail size="1.2rem" />
                <span>Verify with Email Address</span>
              </div>
            </Button>
            <Button onClick={() => handleSelectContactMethod("phone")}>
              <div className="flex items-center justify-center gap-4">
                <FiPhone size="1.2rem" />
                <span>Verify with Phone Number</span>
              </div>
            </Button>
          </div>
        );
      case 2:
        return (
          <>
            <TextInput
              value={emailOrPhone}
              onChange={(e) =>
                handleStateChange({ emailOrPhone: e.target.value })
              }
              placeholder={
                contactMethod === "email" ? "Email Address" : "Phone Number"
              }
            />
            {isOtpSent && (
              <div className="mt-6 ml-1">
                <span>Enter Verification Code Sent</span>
                <OtpInput
                  containerStyle=" my-2 -ml-2 mt-4"
                  inputStyle={{ width: "32px" }}
                  value={otp}
                  onChange={(otpValue) => handleStateChange({ otp: otpValue })}
                  numInputs={6}
                  renderSeparator={<span></span>}
                  inputType="number"
                  renderInput={({ className, ...props }) => (
                    <input
                      className="border-2 rounded mx-2 py-2 outline-none border-gray-300"
                      {...props}
                    />
                  )}
                />
              </div>
            )}
            <div className="flex gap-2 mt-4">
              <Button onClick={() => handleStepChange(authState.step - 1)}>
                Back
              </Button>
              <Button
                onClick={
                  isOtpSent ? handleOtpVerification : handleSendVerificationCode
                }
              >
                Next
              </Button>
            </div>
          </>
        );
      case 3:
        return (
          <div className="mt-6">
            <p className="pb-4">Connect to your wallet</p>
            <Button onClick={handleConnectWallet}>
              <div className="flex items-center justify-center gap-4">
                <LuWallet size="1.2rem" />
                <span>Connect Profile</span>
              </div>
            </Button>
          </div>
        );
      case 4:
        return (
          <div className="my-8 text-center">
            <p>Processing transaction...</p>
          </div>
        );
      default:
        return null;
    }
  };

  // Main render
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => null}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-8 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-lg font-semibold">Verification</p>
                  <IoClose
                    size="1.3rem"
                    onClick={onCloseHandler}
                    className="cursor-pointer"
                  />
                </div>
                {renderStepContent()}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default AuthModal;

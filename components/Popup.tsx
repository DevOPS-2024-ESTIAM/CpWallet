import React, { useState } from "react";

interface ConnectAccountForm {
  address: string;
  mnemonic: string;
  password: string
}

interface TransactionForm {
  to: string;
  value: string;
}

interface PopupProps {
  onClose: () => void;
  onSubmit: (formData: ConnectAccountForm | TransactionForm) => void;
  popupType: "connectAccount" | "transaction";
  visible: boolean;
}

const Popup: React.FC<PopupProps> = ({
  onClose,
  onSubmit,
  popupType,
  visible,
}) => {
  const initialFormData =
    popupType === "connectAccount"
      ? { address: "", mnemonic: "", password: "" }
      : { to: "", value: "" };

  const [formData, setFormData] = useState<
    ConnectAccountForm | TransactionForm
  >(initialFormData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    // on close Reset form data
    onClose();
  };

  if (!visible) return null;

  return (
    <div className="popup relative p-4">
      <button
        className="absolute top-0 right-1 content-center bg-secondary-400 rounded-full w-[25px] h-[25px]"
        onClick={onClose}
      >
        &times;
      </button>
      <div className="popup-inner  bg-primary-200 p-4 rounded-lg">
        {/* <button className="close-btn bg-secondary-400 rouded-full" onClick={onClose}>
          &times;
        </button> */}
        <h2 className="text-center mb-2 font-bold">
          {popupType === "connectAccount"
            ? "Connect Account"
            : "Send Transaction"}
        </h2>
        <form onSubmit={handleSubmit}>
          {popupType === "connectAccount" && (
            <>
              <div className="mb-4">
                <label htmlFor="address">Account Address:</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={(formData as ConnectAccountForm).address || ""}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className="border border-gray-300 rounded-md w-full px-3 py-2 "
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mnemonic">Mot de passe:</label>
                <input
                  type="text"
                  id="password"
                  name="password"
                  value={(formData as ConnectAccountForm).password || ""}
                  onChange={handleChange}
                  placeholder="Enter mnemonic"
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="mnemonic">Mnemonic:</label>
                <input
                  type="text"
                  id="mnemonic"
                  name="mnemonic"
                  value={(formData as ConnectAccountForm).mnemonic || ""}
                  onChange={handleChange}
                  placeholder="Enter mnemonic"
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                />
              </div>
            </>
          )}
          {popupType === "transaction" && (
            <>
              <div className="mb-4">
                <label htmlFor="to">To:</label>
                <input
                  type="text"
                  id="to"
                  name="to"
                  value={(formData as TransactionForm).to || ""}
                  onChange={handleChange}
                  placeholder="Recipient address"
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="value">Value (ETH):</label>
                <input
                  type="text"
                  id="value"
                  name="value"
                  value={(formData as TransactionForm).value || ""}
                  onChange={handleChange}
                  placeholder="Enter value"
                  className="border border-gray-300 rounded-md w-full px-3 py-2"
                />
              </div>
            </>
          )}
          <p>myth like bonus scare over problem client lizard pioneer secret smart health</p>
          <div className="flex justify-center">
            <button
              className="bg-blue-500  rounded px-4 py-2 mr-2"
              type="submit"
            >
              {popupType === "connectAccount" ? "Connect" : "Submit"}
            </button>
            <button
              className="bg-gray-200 text-gray-800 rounded px-4 py-2"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Popup;

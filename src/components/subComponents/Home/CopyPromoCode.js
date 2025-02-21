import React, {useState} from 'react'
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCheckSquare, FaCopy } from "react-icons/fa";
import { toast } from "react-toastify";

const CopyPromoCode = ({referralCode}) => {        
    const [isCopied, setIsCopied] = useState(false);
  
    const onCopyText = () => {
      setIsCopied(true);
      toast.success("Your Promo Code Copied...")
      setTimeout(() => {
        setIsCopied(false);
      }, 6000);
    };
  return (
    <>
    <input
        type="text"
        value={referralCode ? referralCode : "" }
        className="form-control form-control-sm promocode-input"
        arialabel="promoCode"
        aria-describedby="basic-addon2"            
        disabled
      />
      <CopyToClipboard text={referralCode} onCopy={onCopyText}>
        <div className="copy-area">
        <span className="input-group-text" id="basic-addon2">{isCopied ? <FaCheckSquare className='spinner-color FaCheckSquare'/> : <FaCopy className="FaCopy"/>}</span>                    
        </div>
      </CopyToClipboard>    
    </>
  )
}

export default CopyPromoCode
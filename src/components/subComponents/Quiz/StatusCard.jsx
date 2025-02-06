import React, { useContext } from 'react'


const StatusCard = ({cardTitle,titleValue,explanation}) => {
  
    return (
        <div className="px-4">
            <div className="col-12">
                <div className="status-card mb-3" >
                    <div className="p-3">
                        <div className="cardtitle ">
                            <p className='text-start fw-bold'>{cardTitle}- <span className='custom-color'>{titleValue}</span></p>
                        </div>
                        <div className='cardContent ms-2 mb-3'>
                            <div className='d-flex'>
                                <ul className='mb-0'>
                                    <li className='text-start text-secondary'>{explanation}</li>
                                </ul>
                            </div>
                        </div>
                        <div className="form-check d-flex">
                                <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                                    <label className="form-check-label ms-2 text-secondary" for="flexCheckDefault">
                                       I Read & I underStood
                                    </label>
                            </div>
                  </div>

                </div>
            </div>
        </div>
    )
}

export default StatusCard
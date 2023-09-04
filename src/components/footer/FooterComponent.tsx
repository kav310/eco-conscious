import React from 'react';

const FooterComponent = () => {
    return (
        <div className="bg-green-400 text-center pt-4 pb-4">
            <img className="ml-auto mr-auto" src={require('../../assets/images/brandName.svg')}/>
            <div className="text-white">Copyright 2023 @Roehampton</div>
        </div>
    );
};

export default FooterComponent;

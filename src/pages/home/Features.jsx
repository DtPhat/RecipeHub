import React, { useRef } from 'react'
import AccessingIcon from '../../assets/AccessingIcon'
import PlanningIcon from '../../assets/PlanningIcon'
import SharingIcon from '../../assets/SharingIcon'
import ShoppingIcon from '../../assets/ShoppingIcon'

const Features = () => {
    const accessingRef = useRef()
    const planningRef = useRef()
    const shoppingRef = useRef()
    const sharingRef = useRef()
    const iconStyle = 'w-12 sm:w-20 text-green-800 fill-green-200'
    const bigIconStyle = 'w-24 lg:w-36 text-green-800 fill-green-100'
    const features = [{
        text: 'Access your recipes everywhere',
        Icon: <AccessingIcon style={iconStyle} />,
        ref: accessingRef,
    }, {
        text: 'Plan your daily meals',
        Icon: <PlanningIcon style={iconStyle} />,
        ref: planningRef,
    }, {
        text: 'Create your shopping lists',
        Icon: <ShoppingIcon style={iconStyle} />,
        ref: shoppingRef,
    }, {
        text: 'Share your favorite recipes',
        Icon: <SharingIcon style={iconStyle} />,
        ref: sharingRef,
    }]
    const featuresElement = features.map((feature) => {
        const { text, Icon, ref } = feature
        return (
            <div
                key={text}
                onClick={() => ref.current.scrollIntoView({ behavior: 'smooth', block: "center" })}
                className='flex flex-col items-center justify-center hover:bg-green-100 w-1/4 h-full cursor-pointer space-y-2'>
                <div>{Icon}</div>
                <span className='text-xl md:text-2xl text-green-900 font-semibold text-center px-2 h-12 hidden md:block'>{text}</span>
            </div>
        )
    })

    const featureDetails = [{
        title: 'Access your recipes everywhere',
        content: 'Your recipes will be available on your computer, your tablet or your mobile.',
        Icon: <AccessingIcon style={bigIconStyle} />,
        ref: accessingRef,
        imgUrl: '/img/home-devices.png'

    }, {
        title: 'Plan your daily meals',
        content: 'Create your weekly or monthly meal plans, add your recipes in your calendar and create your shopping lists.',
        Icon: <PlanningIcon style={bigIconStyle} />,
        ref: planningRef,
        imgUrl: '/img/home-mealplanner.png'
    }, {
        title: 'Create your shopping lists',
        content: 'Create shopping lists from your recipes or your meal planner.',
        Icon: <ShoppingIcon style={bigIconStyle} />,
        ref: shoppingRef,
        imgUrl: '/img/home-sites.png'

    }, {
        title: 'Share your favorite recipes',
        content: 'Add friends and share your recipes with them by email and view their recipes',
        Icon: <SharingIcon style={bigIconStyle} />,
        ref: sharingRef,
        imgUrl: '/img/home-friends.png'
    }]
    const featureDetailsElement = featureDetails.map((featureDetails, index) => {
        const { title, content, Icon, ref, imgUrl } = featureDetails
        return (
            <div key={title}>
                {index % 2 === 0 ?
                    <div className='flex text-green-900 flex-col md:flex-row' ref={ref}>
                        <div className='w-full md:w-1/2 flex items-center justify-center bg-gray-100 px-4 order-1 md:-order-none'>
                            <img src={imgUrl} alt="feature image" className='w-[24rem]' />
                        </div>
                        <div className='w-full md:w-1/2 flex flex-col items-start justify-center space-y-8 py-4 pl-12 pr-3 bg-gray-50'>
                            <div>{Icon}</div>
                            <h1 className='text-3xl lg:text-5xl'>{title}</h1>
                            <span className='text-lg lg:text-2xl text-left text-black'>{content}</span>
                        </div>
                    </div > :
                    <div className='flex text-green-900 flex-col md:flex-row' ref={ref} >
                        <div className='w-full md:w-1/2 flex flex-col items-end justify-center space-y-8 py-4 pr-12 pl-3 bg-gray-50'>
                            <div>{Icon}</div>
                            <h1 className='text-3xl lg:text-5xl text-right'>{title}</h1>
                            <span className='text-lg lg:text-2xl text-right text-black'>{content}</span>
                        </div>
                        <div className='w-full md:w-1/2 flex items-center justify-center bg-gray-100 px-4'>
                            <img src={imgUrl} alt="feature image" className='w-[24rem]' />
                        </div>
                    </div >
                }
            </div>
        )

    })
    return (
        <section>
            <div className='bg-green-50 flex justify-around h-24 md:h-48 items-center'>
                {featuresElement}
            </div>
            {featureDetailsElement}
        </section>

    )
}




export default Features
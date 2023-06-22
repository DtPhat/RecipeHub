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
    const iconStyle = 'w-20 h-20 text-green-800 fill-green-200'
    const bigIconStyle = 'w-36 h-36 text-green-800 fill-green-100'
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
                <span className='text-2xl text-green-900 font-semibold text-center'>{text}</span>
            </div>
        )
    })

    const featureDetails = [{
        title: 'Access your recipes everywhere',
        content: 'Your recipes are stored in the cloud and will be available on your computer, your tablet or your mobile.',
        Icon: <AccessingIcon style={bigIconStyle} />,
        ref: accessingRef,
        imgUrl: '/img/home-devices.png'

    }, {
        title: 'Plan your daily meals',
        content: 'Create your weekly or monthly meal plans. Drag your recipes in your calendar, change servings and create your shopping lists.',
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
        content: 'Invite your friends to join RecipeHub, share your recipes with them and view their recipes, or share your recipes on Facebook or by email and others.',
        Icon: <SharingIcon style={bigIconStyle} />,
        ref: sharingRef,
        imgUrl: '/img/home-friends.png'
    }]
    const featureDetailsElement = featureDetails.map((featureDetails, index) => {
        const { title, content, Icon, ref, imgUrl } = featureDetails
        return (
            <div key={title}>
                {index % 2 === 0 ?
                    <div className='flex text-green-900 h-[24rem]' ref={ref}>
                        <div className='w-1/2 flex items-center justify-center bg-gray-100'>
                            <img src={imgUrl} alt="feature image" className='w-[24rem]' />
                        </div>
                        <div className='w-1/2 flex flex-col items-start justify-center space-y-8 py-6 pl-12 pr-3 bg-gray-50'>
                            <div>{Icon}</div>
                            <h1 className='text-5xl'>{title}</h1>
                            <span className='text-2xl text-left text-black'>{content}</span>
                        </div>
                    </div > :
                    <div className='flex text-green-900 h-[24rem]' ref={ref} >
                        <div className='w-1/2 flex flex-col items-end justify-center space-y-8 py-6 pr-12 pl-3 bg-gray-50'>
                            <div>{Icon}</div>
                            <h1 className='text-5xl text-center'>{title}</h1>
                            <span className='text-2xl text-right text-black'>{content}</span>
                        </div>
                        <div className='w-1/2 flex items-center justify-center bg-gray-100'>
                            <img src={imgUrl} alt="feature image" className='w-[24rem]' />
                        </div>
                    </div >
                }
            </div>
        )

    })
    return (
        <section>
            <div className='bg-green-50 flex justify-around h-48 items-center'>
                {featuresElement}
            </div>
            {featureDetailsElement}
        </section>

    )
}




export default Features
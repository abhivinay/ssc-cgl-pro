import{
MotionConfig as FramerMotionConfig,
useReducedMotion
}from"framer-motion";

export default function MotionConfig({
children
}){
const shouldReduceMotion=
useReducedMotion();

return(
<FramerMotionConfig
reducedMotion={
shouldReduceMotion
?"always"
:"never"
}
transition={{
duration:0.45,
ease:[0.22,1,0.36,1]
}}
>
{children}
</FramerMotionConfig>
);
}
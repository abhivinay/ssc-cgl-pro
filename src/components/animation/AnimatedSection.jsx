import{motion}from"framer-motion";

export default function AnimatedCard({
children,
className="",
delay=0,
hover=true
}){

return(

<motion.div

initial={{
opacity:0,
y:24,
scale:.98
}}

whileInView={{
opacity:1,
y:0,
scale:1
}}

viewport={{
once:true,
amount:.2
}}

transition={{
duration:.45,
delay,
ease:[0.22,1,0.36,1]
}}

whileHover={
hover
?{
y:-6,
scale:1.01,
transition:{
duration:.2
}
}
:undefined
}

className={className}

>

{children}

</motion.div>

);

}
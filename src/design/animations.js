const animations=Object.freeze({

duration:{
instant:"100ms",
fast:"200ms",
normal:"300ms",
slow:"500ms",
slower:"700ms"
},

easing:{
default:"cubic-bezier(0.4,0,0.2,1)",
smooth:"cubic-bezier(0.22,1,0.36,1)",
bounce:"cubic-bezier(0.34,1.56,0.64,1)"
},

transition:{
fast:"all 200ms cubic-bezier(0.4,0,0.2,1)",
normal:"all 300ms cubic-bezier(0.4,0,0.2,1)",
slow:"all 500ms cubic-bezier(0.4,0,0.2,1)"
},

hover:{
scale:"scale(1.03)",
lift:"translateY(-4px)",
press:"scale(0.98)"
},

keyframes:{
fadeIn:{
from:{
opacity:0
},
to:{
opacity:1
}
},

slideUp:{
from:{
opacity:0,
transform:"translateY(24px)"
},
to:{
opacity:1,
transform:"translateY(0)"
}
},

slideDown:{
from:{
opacity:0,
transform:"translateY(-24px)"
},
to:{
opacity:1,
transform:"translateY(0)"
}
},

scaleIn:{
from:{
opacity:0,
transform:"scale(0.94)"
},
to:{
opacity:1,
transform:"scale(1)"
}
},

pop:{
0:{
transform:"scale(1)"
},
50:{
transform:"scale(1.08)"
},
100:{
transform:"scale(1)"
}
},

shake:{
0:{
transform:"translateX(0)"
},
25:{
transform:"translateX(-6px)"
},
50:{
transform:"translateX(6px)"
},
75:{
transform:"translateX(-4px)"
},
100:{
transform:"translateX(0)"
}
}

}

});

export default animations;
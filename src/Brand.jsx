import React from 'react'
import './Brand.css'
import Slider from 'react-slick';




function Brand ()  {
    var settings = {
    dots: true,
    infinite: true,
    autoplay:true,
    autoplaySpeed:3000,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
    const brand=[      
        "https://imgs.search.brave.com/OGqepOPMJBbunSq6fbPVa-TgAwO46IPZChQViRTJE6g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzM3LzEvYm9hdC1s/b2dvLXBuZ19zZWVr/bG9nby0zNzkxODUu/cG5n",
       "https://imgs.search.brave.com/sU5ddbhjN0vwpPMwb1ooeSpHhXzfiXLBXm_0uVque7E/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pcHJz/b2Z0d2FyZW1lZGlh/LmNvbS8yMTQvZmls/ZXMvMjAyMTEvNjAz/NjcxNTJiM2FlZDM1/ODc4Y2YwZmU0X0pC/TCUyMExvZ28lMjBK/UEcvSkJMJTIwTG9n/byUyMEpQR19mNWNh/MTU2Ni1lY2QxLTQ5/YmMtYTA5NC01OWU0/NTg3ZWE0YWItcHJ2/LmpwZw",
        "https://imgs.search.brave.com/lWIR7FmsQbODQz2tofQMdb-5zvHdwQApVHVBw539778/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/aWNvbnM4LmNvbS9k/b3R0eS8xMjAwL3Nh/bXN1bmcuanBn",
        "https://imgs.search.brave.com/7x5DGdIm5YmE2mSwBkD5BdnymWg7AOYHmmEbUcoa0Ds/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/a2luZHBuZy5jb20v/cGljYy9tLzI4Ni0y/ODY1MjQzX2JvdWx0/LWF1ZGlvLWxvZ28t/aGQtcG5nLWRvd25s/b2FkLnBuZw",
        "https://imgs.search.brave.com/wyxNoMw-kc4kYf8SCTnEOINDpaUFd-wO_Zc0GDrQ5zI/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjkv/Mjg0Lzk2Ny9zbWFs/bC9wdW1hLXNwb3J0/c3dlYXItYnJhbmQt/bG9nby1zaG9lLWJy/YW5kLWJsYWNrLWxv/Z290eXBlLXN0b2Nr/LW9uLXRyYW5zcGFy/ZW50LWJhY2tncm91/bmQtZnJlZS12ZWN0/b3IuanBn",
        "https://imgs.search.brave.com/7qIOvBSjSD6Pk2ZUCRWz857bqbyRLOc19i92MdKItuc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzQ1LzEvbml2aWEt/c3BvcnRzLWxvZ28t/cG5nX3NlZWtsb2dv/LTQ1OTQ1NS5wbmc",
        "https://imgs.search.brave.com/eoOWZv19Hy62ODaLkYJ-IDfknK85iTtr7LO_d4eG-e4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMudmVjdGVlenku/Y29tL3N5c3RlbS9y/ZXNvdXJjZXMvdGh1/bWJuYWlscy8wMjAv/OTI3LzA0MS9zbWFs/bC94aWFvbWktbG9n/by1icmFuZC1waG9u/ZS1zeW1ib2wtZGVz/aWduLWNoaW5lc2Ut/bW9iaWxlLWlsbHVz/dHJhdGlvbi1ibGFj/ay1mcmVlLXZlY3Rv/ci5qcGc",
        "https://imgs.search.brave.com/gM-pJf_1TnweijjCMx4vH4mdmhRFCNk-mUJIcjVaOzQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly8xMDAw/bG9nb3MubmV0L3dw/LWNvbnRlbnQvdXBs/b2Fkcy8yMDE5LzA2/L0FwcGxlLUxvZ28u/anBn",
        "https://imgs.search.brave.com/5EpZ2S2T2Mu3E_XN8GAusy92nq0E9rf9jX-1F6rEU3g/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuc2Vla2xvZ28u/Y29tL2xvZ28tcG5n/LzYvMS9nb2RyZWot/bG9nby1wbmdfc2Vl/a2xvZ28tNjE3NjAu/cG5n"


    ]

    console.log(brand);
  return (
    <>
    <h2 className='brandnames'>Brands</h2>
    
    <div className='brandcontainer'>
        <Slider {...settings}>
        {brand.map(item=>{
            return(
            <div key={item._id} className='brandimagediv'>
                <div className='brandimagesecond'>
                <img src={item} alt="brand images"  className='brandimages'/>
                </div>
                
            </div>
            )
        })}
        </Slider>
        
      
    </div>
    </>
  )
}

export default Brand

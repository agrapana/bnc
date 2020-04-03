import React, { useState, useEffect } from 'react';

const GoogleMap = (props) => {

    const [loadingportfolio, loadingportfolioHandler] = useState(false);

    function onScriptLoad() {
        const map = new window.google.maps.Map(
            document.getElementById(props.id),
            props.options);
        props.onMapLoad(map)
    }

    useEffect(() => {
        let mounted = true;
        const abortController = new AbortController();

        const getAllData = async () => {
            try {
                loadingportfolioHandler(true);
                if (mounted && !window.google) {
                    var s = document.createElement('script');
                    s.type = 'text/javascript';
                    s.src = `https://maps.google.com/maps/api/js?key=YOUR_API_KEY`;
                    var x = document.getElementsByTagName('script')[0];
                    x.parentNode.insertBefore(s, x);
                    // Below is important. 
                    //We cannot access google.maps until it's finished loading
                    s.addEventListener('load', e => {
                        onScriptLoad()
                        loadingportfolioHandler(false);
                    })
                } else {
                    onScriptLoad()
                    loadingportfolioHandler(false);
                }

            } catch (error) {

            }
        }
        getAllData();
        return () => {
            mounted = false;
            abortController.abort();
        }
    }, [])

    // componentDidMount() {
    //     if (!window.google) {
    //         var s = document.createElement('script');
    //         s.type = 'text/javascript';
    //         s.src = `https://maps.google.com/maps/api/js?key=YOUR_API_KEY`;
    //         var x = document.getElementsByTagName('script')[0];
    //         x.parentNode.insertBefore(s, x);
    //         // Below is important. 
    //         //We cannot access google.maps until it's finished loading
    //         s.addEventListener('load', e => {
    //             this.onScriptLoad()
    //         })
    //     } else {
    //         this.onScriptLoad()
    //     }
    // }


    return (
        <div style={props.isMobile ? { width: props.size.width - ((props.size.width*11)/100), height: props.size.width - ((props.size.width*11)/100) } : { width: 700, height: 500 }} id={props.id} />
    );

}

export default GoogleMap;

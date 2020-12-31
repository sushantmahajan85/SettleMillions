<% if(user){ %>
        <% if(cooCount !== 0 || user.cookies.length){ %>
            <div class="titles_main">
                <a href="/recommended">
                    <div class="mainpage_titles">Recommended</div>
                </a>
                <!-- <a href="/recommended"><div class="mainpage_titles-options">See All</div></a> -->
            </div>
           
        <div id="recommended" class="trending">

            <%  var i = 0,n = 0; %>
            <% for(var deal of recommendedDeals) { %>
            <% i++; %>
            <!-- && ((Date.now() - deal.time) < 2*24*3600*1000) -->
            <% if(i>cooCount) {%>
            <% n++; %>
            <!-- <a href=<%= `/deal/${deal._id}/postedBy/${deal.user}` %>> -->
                <%  function kFormatter(num) {
                    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num);
                } 
                var vui = kFormatter(deal.views);
    
                
                var tem = Math.round(deal.time/360000)/10;
            var minutes = Math.round(deal.time/6000)/10;
                var day = Math.round((tem/2.4))/10;
                %>
                <a href=<%= `/deal/${deal._id}/postedBy/${deal.user}` %>>
                    <div class="card">
                        <div class="card__face">
                            <div class="card__picture" data-pause="true" data-interval="1000">
                                <!-- <div class="discount" style="position: absolute; top: 2%; right:2%; color: #d10024; background: none; border: 1.8px solid #d10024; height: 2.8rem; font-size: 1.5rem; padding: 0 0.5rem; z-index: 1000">-70%</div> -->
                                <div class="carousel-item active">
                                    <img src=<%= `/img/deals/${deal.titleImg}` %> alt="Deal Photo" class="deal-photo">
                                    <!-- <a href="https://www.amazon.in/Cadbury-Dairy-Hazelnut-Chocolate-Pouch/dp/B07KY37F5J/ref=as_li_ss_il?almBrandId=ctnow&crid=2WZ9WN1FG57CC&dchild=1&fpw=alm&keywords=dairy+milk+silk&qid=1600012862&refinements=p_85:10440599031&rnid=10440598031&rps=1&s=grocery&sbo=m6DjfpMzMLDmL8pSMKX8hw==&sprefix=dairy,grocery,458&sr=1-1&linkCode=li3&tag=topaffiliat01-21&linkId=c922ef5ec4446ac11092c0241394c341&language=en_IN" target="_blank"><img border="0" src="//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07KY37F5J&Format=_SL250_&ID=AsinImage&MarketPlace=IN&ServiceVersion=20070822&WS=1&tag=topaffiliat01-21&language=en_IN" ></a><img src="https://ir-in.amazon-adsystem.com/e/ir?t=topaffiliat01-21&language=en_IN&l=li3&o=31&a=B07KY37F5J" width="1" height="1" border="0" alt="" class="deal-photo" style="border:none !important; margin:0px !important;" /> -->
                                </div>
                                <% for( var photo of deal.corouselImgs) { %>
                                <div class="carousel-item ">
                                    <img src=<%= `/img/deals/${photo}` %> alt="Deal Photo" class="deal-photo">
                                </div>
                                <% } %>
                            </div>
                            <div class="card-text">
                                <div class="card__details">
                                    <ul>
                                        <h3 class="product_name_mainp">
                                            <%= deal.dealName %>
                                        </h3>
                                        <div>
                                            <a class="aff_name" href=<%= `/member/${deal.user}` %>><span style="margin-right: 1rem;"><%= deal.owner %></span> | <i style="margin-left: 1rem;" class="mp_icon1 fa fa-amazon"></i>
                                            </a>
                                        </div>
                                        <!-- <i class=" mp_aff-name-tag fas fa-check-circle"></i> -->
    
                                        <div class="views_time_mp">
                                            <div style="display: inline-block; color: #737b8a">
                                                <i class="fas fa-eye"></i>
                                                <% if (deal.views > 999) { %>
                                                <span style="margin-left: 0.5rem; font-weight: 600;"><%=`${vui}`%></span>
                                                <% } else { %>
                                                <span style="margin-left: 0.5rem; font-weight: 600;"><%=`${deal.views}`%></span>
                                                <% } %>
    
                                                <i class="fas fa-clock" style="margin-left: 2rem;"></i>
                                                <% if (tem > 24) { %>
                                                <span style="margin-left: 0.5rem; font-weight: 600;"><%=`${day} day(s)`%></span>
                                                <% } else if (tem > 1) { %>
                                                <span style="margin-left: 0.5rem; font-weight: 600;"><%=`${tem} hr`%></span>
                                                <% } else { %>
                                                <span style="margin-left: 0.5rem; font-weight: 600;"><%=`${minutes} min`%></span>
                                                <% } %>
    
                                            </div>
                                            <div class="monetory_values_mp">
                                                <li class="price"><span class="mp_price price_avail">₹<%= deal.mrp %> </span>
                                                    <strike class="mp_p-mrp price_mrp">₹<%= deal.dealPrice %> </strike><span class="mp_price price_avail"> (<%= deal.discount%>%) </span>
                                                <li style="font-weight: 400;">
                                                </li>
                                            </div>
                                        <!-- <div class="mp_like-rate">
                                            <i class="mp_like_deal far fa-heart"></i>
                                            <span class="mp_like_deal">Like</span>
                                            <div class="mp_share">
                                                <i class="mp_share_deal fas fa-share-square"></i>
                                                <span class="mp_share_deal">Share</span>
                                            </div>
                                        </div> -->
                                    </ul>
                                </div>
                                <% if(user){ %>
                                <form action="/" method="GET" class=reportx>
                                    <select class="mp_dealbox_three-dots" id="change" name="dealOps"
                                        onChange="dealOperations(this)" onfocus="this.selectedIndex = -1">
                                        <option selected disabled value="empty" disabled></option>
                                        <option value=<%= `report/${deal._id}/${user._id}` %>>Report</option>
                                        <option value=<%= `like/${deal._id}/${user._id}` %>>Like</option>
                                    </select>
                                </form>
                                <% } %>
                            </div>
                        </div>
                    </div>
                </a>

                <% } %>
                <% if (n===4){break;}%>
                <% } %>
        </div>

        <div id="hideRecommended" class="trending">
            <% var j = 0; %>
            <% for(var deal of recommendedDeals) { %>
            <% j++; %>

            <% if(j > (cooCount+4)) {%>

            <% if(i>cooCount && deal.trendRatio > 4) {%>
                <%  function kFormatter(num) {
                    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num);
                } 
                var vui = kFormatter(deal.views);
    
                
                var tem = Math.round(deal.time/360000)/10;
            var minutes = Math.round(deal.time/6000)/10;
                var day = Math.round((tem/2.4))/10;
                %>
                <a href=<%= `/deal/${deal._id}/postedBy/${deal.user}` %>>
                    <div class="card">
                        <div class="card__face">
                            <div class="card__picture" data-pause="true" data-interval="1000">
                                <!-- <div class="discount" style="position: absolute; top: 2%; right:2%; color: #d10024; background: none; border: 1.8px solid #d10024; height: 2.8rem; font-size: 1.5rem; padding: 0 0.5rem; z-index: 1000">-70%</div> -->
                                <div class="carousel-item active">
                                    <img src=<%= `/img/deals/${deal.titleImg}` %> alt="Deal Photo" class="deal-photo">
                                    <!-- <a href="https://www.amazon.in/Cadbury-Dairy-Hazelnut-Chocolate-Pouch/dp/B07KY37F5J/ref=as_li_ss_il?almBrandId=ctnow&crid=2WZ9WN1FG57CC&dchild=1&fpw=alm&keywords=dairy+milk+silk&qid=1600012862&refinements=p_85:10440599031&rnid=10440598031&rps=1&s=grocery&sbo=m6DjfpMzMLDmL8pSMKX8hw==&sprefix=dairy,grocery,458&sr=1-1&linkCode=li3&tag=topaffiliat01-21&linkId=c922ef5ec4446ac11092c0241394c341&language=en_IN" target="_blank"><img border="0" src="//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07KY37F5J&Format=_SL250_&ID=AsinImage&MarketPlace=IN&ServiceVersion=20070822&WS=1&tag=topaffiliat01-21&language=en_IN" ></a><img src="https://ir-in.amazon-adsystem.com/e/ir?t=topaffiliat01-21&language=en_IN&l=li3&o=31&a=B07KY37F5J" width="1" height="1" border="0" alt="" class="deal-photo" style="border:none !important; margin:0px !important;" /> -->
                                </div>
                                <% for( var photo of deal.corouselImgs) { %>
                                <div class="carousel-item ">
                                    <img src=<%= `/img/deals/${photo}` %> alt="Deal Photo" class="deal-photo">
                                </div>
                                <% } %>
                            </div>
                            <div class="card-text">
                                <div class="card__details">
                                    <ul>
                                        <h3 class="product_name_mainp">
                                            <%= deal.dealName %>
                                        </h3>
                                        <div>
                                            <a class="aff_name" href=<%= `/member/${deal.user}` %>><span style="margin-right: 1rem;"><%= deal.owner %></span> | <i style="margin-left: 1rem;" class="mp_icon1 fa fa-amazon"></i>
                                            </a>
                                        </div>
                                        <!-- <i class=" mp_aff-name-tag fas fa-check-circle"></i> -->
    
                                        <div class="views_time_mp">
                                            <div style="display: inline-block; color: #737b8a">
                                                <i class="fas fa-eye"></i>
                                                <% if (deal.views > 999) { %>
                                                <span style="margin-left: 0.5rem; font-weight: 600;"><%=`${vui}`%></span>
                                                <% } else { %>
                                                <span style="margin-left: 0.5rem; font-weight: 600;"><%=`${deal.views}`%></span>
                                                <% } %>
    
                                                <i class="fas fa-clock" style="margin-left: 2rem;"></i>
                                                <% if (tem > 24) { %>
                                                <span style="margin-left: 0.5rem; font-weight: 600;"><%=`${day} day(s)`%></span>
                                                <% } else if (tem > 1) { %>
                                                <span style="margin-left: 0.5rem; font-weight: 600;"><%=`${tem} hr`%></span>
                                                <% } else { %>
                                                <span style="margin-left: 0.5rem; font-weight: 600;"><%=`${minutes} min`%></span>
                                                <% } %>
    
                                            </div>
                                            <div class="monetory_values_mp">
                                                <li class="price"><span class="mp_price price_avail">₹<%= deal.mrp %> </span>
                                                    <strike class="mp_p-mrp price_mrp">₹<%= deal.dealPrice %> </strike><span class="mp_price price_avail"> (<%= deal.discount%>%) </span>
                                                <li style="font-weight: 400;">
                                                </li>
                                            </div>
                                        <!-- <div class="mp_like-rate">
                                            <i class="mp_like_deal far fa-heart"></i>
                                            <span class="mp_like_deal">Like</span>
                                            <div class="mp_share">
                                                <i class="mp_share_deal fas fa-share-square"></i>
                                                <span class="mp_share_deal">Share</span>
                                            </div>
                                        </div> -->
                                    </ul>
                                </div>
                                <% if(user){ %>
                                <form action="/" method="GET" class=reportx>
                                    <select class="mp_dealbox_three-dots" id="change" name="dealOps"
                                        onChange="dealOperations(this)" onfocus="this.selectedIndex = -1">
                                        <option selected disabled value="empty" disabled></option>
                                        <option value=<%= `report/${deal._id}/${user._id}` %>>Report</option>
                                        <option value=<%= `like/${deal._id}/${user._id}` %>>Like</option>
                                    </select>
                                </form>
                                <% } %>
                            </div>
                        </div>
                    </div>
                </a>


                <% } %>
                <% } %>
                <% } %>
        </div>

        <div id="showMoreR">
            <a href="#recommended" class="show-hide-link" id="more" onclick="recMoreLess()">
                <i class="fas fa-caret-down font_icon" id="down" style="color: red;margin:0 1.2rem 0 1rem;"></i>
                <span class="heading-normal">See More</span>
            </a>
        </div>
        <div id="showLessR">
            <a href="#hideRecommended" class="show-hide-link" id="more" onclick="recMoreLess()">
                <i class="fas fa-caret-up font_icon" id="up" style="color: red;margin:0 1.2rem 0 1rem;"></i>
                <span class="heading-normal">Show Less</span>
            </a>
        </div>

        <% } %>
        <% }else{ %>

            <% if(cooCount !== 0){ %>
                <div class="titles_main">
                    <a href="/recommended">
                        <div class="mainpage_titles">Recommended</div>
                    </a>
                    <a href="/recommended"><div class="mainpage_titles-options">See All</div></a>
                </div>
               
        <div id="recommended" class="trending">

            <%  var i = 0,n = 0; %>
            <% for(var deal of recommendedDeals) { %>
            <% i++; %>

            <% if(i>cooCount) {%>
            <% n++; %>
            <!-- <a href=<%= `/deal/${deal._id}/postedBy/${deal.user}` %>> -->
                <%  function kFormatter(num) {
                    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num);
                } 
                var vui = kFormatter(deal.views);
    
                
                var tem = Math.round(deal.time/360000)/10;
            var minutes = Math.round(deal.time/6000)/10;
                var day = Math.round((tem/2.4))/10;
                %>
                <a href=<%= `/deal/${deal._id}/postedBy/${deal.user}` %>>
                    <div class="card">
                        <div class="card__face">
                            <div class="card__picture" data-pause="true" data-interval="1000">
                                <!-- <div class="discount" style="position: absolute; top: 2%; right:2%; color: #d10024; background: none; border: 1.8px solid #d10024; height: 2.8rem; font-size: 1.5rem; padding: 0 0.5rem; z-index: 1000">-70%</div> -->
                                <div class="carousel-item active">
                                    <img src=<%= `/img/deals/${deal.titleImg}` %> alt="Deal Photo" class="deal-photo">
                                    <!-- <a href="https://www.amazon.in/Cadbury-Dairy-Hazelnut-Chocolate-Pouch/dp/B07KY37F5J/ref=as_li_ss_il?almBrandId=ctnow&crid=2WZ9WN1FG57CC&dchild=1&fpw=alm&keywords=dairy+milk+silk&qid=1600012862&refinements=p_85:10440599031&rnid=10440598031&rps=1&s=grocery&sbo=m6DjfpMzMLDmL8pSMKX8hw==&sprefix=dairy,grocery,458&sr=1-1&linkCode=li3&tag=topaffiliat01-21&linkId=c922ef5ec4446ac11092c0241394c341&language=en_IN" target="_blank"><img border="0" src="//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07KY37F5J&Format=_SL250_&ID=AsinImage&MarketPlace=IN&ServiceVersion=20070822&WS=1&tag=topaffiliat01-21&language=en_IN" ></a><img src="https://ir-in.amazon-adsystem.com/e/ir?t=topaffiliat01-21&language=en_IN&l=li3&o=31&a=B07KY37F5J" width="1" height="1" border="0" alt="" class="deal-photo" style="border:none !important; margin:0px !important;" /> -->
                                </div>
                                <% for( var photo of deal.corouselImgs) { %>
                                <div class="carousel-item ">
                                    <img src=<%= `/img/deals/${photo}` %> alt="Deal Photo" class="deal-photo">
                                </div>
                                <% } %>
                            </div>
                            <div class="card-text">
                                <div class="card__details">
                                    <ul>
                                        <h3 class="product_name_mainp">
                                            <%= deal.dealName %>
                                        </h3>
                                        <div>
                                            <a class="aff_name" href=<%= `/member/${deal.user}` %>><span style="margin-right: 1rem;"><%= deal.owner %></span> | <i style="margin-left: 1rem;" class="mp_icon1 fa fa-amazon"></i>
                                            </a>
                                        </div>
                                        <!-- <i class=" mp_aff-name-tag fas fa-check-circle"></i> -->
    
                                        <div class="views_time_mp">
                                            <div style="display: inline-block; color: #737b8a">
                                                <i class="fas fa-eye"></i>
                                                <% if (deal.views > 999) { %>
                                                <span style="margin-left: 0.5rem; font-weight: 600;"><%=`${vui}`%></span>
                                                <% } else { %>
                                                <span style="margin-left: 0.5rem; font-weight: 600;"><%=`${deal.views}`%></span>
                                                <% } %>
    
                                                <i class="fas fa-clock" style="margin-left: 2rem;"></i>
                                                <% if (tem > 24) { %>
                                                <span style="margin-left: 0.5rem; font-weight: 600;"><%=`${day} day(s)`%></span>
                                                <% } else if (tem > 1) { %>
                                                <span style="margin-left: 0.5rem; font-weight: 600;"><%=`${tem} hr`%></span>
                                                <% } else { %>
                                                <span style="margin-left: 0.5rem; font-weight: 600;"><%=`${minutes} min`%></span>
                                                <% } %>
    
                                            </div>
                                            <div class="monetory_values_mp">
                                                <li class="price"><span class="mp_price price_avail">₹<%= deal.mrp %> </span>
                                                    <strike class="mp_p-mrp price_mrp">₹<%= deal.dealPrice %> </strike><span class="mp_price price_avail"> (<%= deal.discount%>%) </span>
                                                <li style="font-weight: 400;">
                                                </li>
                                            </div>
                                        <!-- <div class="mp_like-rate">
                                            <i class="mp_like_deal far fa-heart"></i>
                                            <span class="mp_like_deal">Like</span>
                                            <div class="mp_share">
                                                <i class="mp_share_deal fas fa-share-square"></i>
                                                <span class="mp_share_deal">Share</span>
                                            </div>
                                        </div> -->
                                    </ul>
                                </div>
                                <% if(user){ %>
                                <form action="/" method="GET" class=reportx>
                                    <select class="mp_dealbox_three-dots" id="change" name="dealOps"
                                        onChange="dealOperations(this)" onfocus="this.selectedIndex = -1">
                                        <option selected disabled value="empty" disabled></option>
                                        <option value=<%= `report/${deal._id}/${user._id}` %>>Report</option>
                                        <option value=<%= `like/${deal._id}/${user._id}` %>>Like</option>
                                    </select>
                                </form>
                                <% } %>
                            </div>
                        </div>
                    </div>
                </a>

                <% } %>
                <% if (n===4){break;}%>
                <% } %>
        </div>

        <div id="hideRecommended" class="trending">
            <% var j = 0; %>
            <% for(var deal of recommendedDeals) { %>
            <% j++; %>

            <% if(j > (cooCount+4)) {%>

            <% if(i>cooCount && deal.trendRatio > 4) {%>
                <%  function kFormatter(num) {
                    return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num);
                } 
                var vui = kFormatter(deal.views);
    
                
                var tem = Math.round(deal.time/360000)/10;
            var minutes = Math.round(deal.time/6000)/10;
                var day = Math.round((tem/2.4))/10;
                %>
                <a href=<%= `/deal/${deal._id}/postedBy/${deal.user}` %>>
                    <div class="card">
                        <div class="card__face">
                            <div class="card__picture" data-pause="true" data-interval="1000">
                                <!-- <div class="discount" style="position: absolute; top: 2%; right:2%; color: #d10024; background: none; border: 1.8px solid #d10024; height: 2.8rem; font-size: 1.5rem; padding: 0 0.5rem; z-index: 1000">-70%</div> -->
                                <div class="carousel-item active">
                                    <img src=<%= `/img/deals/${deal.titleImg}` %> alt="Deal Photo" class="deal-photo">
                                    <!-- <a href="https://www.amazon.in/Cadbury-Dairy-Hazelnut-Chocolate-Pouch/dp/B07KY37F5J/ref=as_li_ss_il?almBrandId=ctnow&crid=2WZ9WN1FG57CC&dchild=1&fpw=alm&keywords=dairy+milk+silk&qid=1600012862&refinements=p_85:10440599031&rnid=10440598031&rps=1&s=grocery&sbo=m6DjfpMzMLDmL8pSMKX8hw==&sprefix=dairy,grocery,458&sr=1-1&linkCode=li3&tag=topaffiliat01-21&linkId=c922ef5ec4446ac11092c0241394c341&language=en_IN" target="_blank"><img border="0" src="//ws-in.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=B07KY37F5J&Format=_SL250_&ID=AsinImage&MarketPlace=IN&ServiceVersion=20070822&WS=1&tag=topaffiliat01-21&language=en_IN" ></a><img src="https://ir-in.amazon-adsystem.com/e/ir?t=topaffiliat01-21&language=en_IN&l=li3&o=31&a=B07KY37F5J" width="1" height="1" border="0" alt="" class="deal-photo" style="border:none !important; margin:0px !important;" /> -->
                                </div>
                                <% for( var photo of deal.corouselImgs) { %>
                                <div class="carousel-item ">
                                    <img src=<%= `/img/deals/${photo}` %> alt="Deal Photo" class="deal-photo">
                                </div>
                                <% } %>
                            </div>
                            <div class="card-text">
                                <div class="card__details">
                                    <ul>
                                        <h3 class="product_name_mainp">
                                            <%= deal.dealName %>
                                        </h3>
                                        <div>
                                            <a class="aff_name" href=<%= `/member/${deal.user}` %>><span style="margin-right: 1rem;"><%= deal.owner %></span> | <i style="margin-left: 1rem;" class="mp_icon1 fa fa-amazon"></i>
                                            </a>
                                        </div>
                                        <!-- <i class=" mp_aff-name-tag fas fa-check-circle"></i> -->
    
                                        <div class="views_time_mp">
                                            <div style="display: inline-block; color: #737b8a">
                                                <i class="fas fa-eye"></i>
                                                <% if (deal.views > 999) { %>
                                                <span style="margin-left: 0.5rem; font-weight: 600;"><%=`${vui}`%></span>
                                                <% } else { %>
                                                <span style="margin-left: 0.5rem; font-weight: 600;"><%=`${deal.views}`%></span>
                                                <% } %>
    
                                                <i class="fas fa-clock" style="margin-left: 2rem;"></i>
                                                <% if (tem > 24) { %>
                                                <span style="margin-left: 0.5rem; font-weight: 600;"><%=`${day} day(s)`%></span>
                                                <% } else if (tem > 1) { %>
                                                <span style="margin-left: 0.5rem; font-weight: 600;"><%=`${tem} hr`%></span>
                                                <% } else { %>
                                                <span style="margin-left: 0.5rem; font-weight: 600;"><%=`${minutes} min`%></span>
                                                <% } %>
    
                                            </div>
                                            <div class="monetory_values_mp">
                                                <li class="price"><span class="mp_price price_avail">₹<%= deal.mrp %> </span>
                                                    <strike class="mp_p-mrp price_mrp">₹<%= deal.dealPrice %> </strike><span class="mp_price price_avail"> (<%= deal.discount%>%) </span>
                                                <li style="font-weight: 400;">
                                                </li>
                                            </div>
                                        <!-- <div class="mp_like-rate">
                                            <i class="mp_like_deal far fa-heart"></i>
                                            <span class="mp_like_deal">Like</span>
                                            <div class="mp_share">
                                                <i class="mp_share_deal fas fa-share-square"></i>
                                                <span class="mp_share_deal">Share</span>
                                            </div>
                                        </div> -->
                                    </ul>
                                </div>
                                <% if(user){ %>
                                <form action="/" method="GET" class=reportx>
                                    <select class="mp_dealbox_three-dots" id="change" name="dealOps"
                                        onChange="dealOperations(this)" onfocus="this.selectedIndex = -1">
                                        <option selected disabled value="empty" disabled></option>
                                        <option value=<%= `report/${deal._id}/${user._id}` %>>Report</option>
                                        <option value=<%= `like/${deal._id}/${user._id}` %>>Like</option>
                                    </select>
                                </form>
                                <% } %>
                            </div>
                        </div>
                    </div>
                </a>


                <% } %>
                <% } %>
                <% } %>
        </div>

        <div id="showMoreR">
            <a href="#recommended" class="show-hide-link" id="more" onclick="recMoreLess()">
                <i class="fas fa-caret-down font_icon" id="down" style="color: red;margin:0 1.2rem 0 1rem;"></i>
                <span class="heading-normal">See More</span>
            </a>
        </div>
        <div id="showLessR">
            <a href="#hideRecommended" class="show-hide-link" id="more" onclick="recMoreLess()">
                <i class="fas fa-caret-up font_icon" id="up" style="color: red;margin:0 1.2rem 0 1rem;"></i>
                <span class="heading-normal">Show Less</span>
            </a>
        </div>
        <% } %>
        <% } %>
<% if (user && subDeals.length != 0 ) { %>
         
        
        <div class="titles_main">
            <a href="#">
                <div class="mainpage_titles">Subscribed Deals</div>
            </a>
            <a href="#"><div class="mainpage_titles-options">See All</div></a>
        </div>
       
<% for( var oneSub of subDeals) { %>
        <div id="trending" class="trending">

            <%  var i = 0; %>
            <% for( var deal of oneSub.subscribedDeals ) { %>
            <% i++; %>
            <%  function kFormatter(num) {
                return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num);
            } 
            var vui = kFormatter(deal.views);

            var now = new Date(Date.now());
            var tem = Math.round((now.getTime() - deal.time.getTime())/360000)/10;
            var day = Math.round((tem/2.4))/10;
            %>
            <% function timeSince(date) {

                var seconds = Math.floor((new Date() - date) / 1000);
              
                var interval = Math.floor(seconds / 31536000);
              
                if (interval > 1) {
                  return interval + " years";
                }
                interval = Math.floor(seconds / 2592000);
                if (interval > 1) {
                  return interval + " months";
                }
                interval = Math.floor(seconds / 86400);
                if (interval > 1) {
                  return interval + " days";
                }
                interval = Math.floor(seconds / 3600);
                if (interval > 1) {
                  return interval + " hours";
                }
                interval = Math.floor(seconds / 60);
                if (interval > 1) {
                  return interval + " minutes";
                }
                return Math.floor(seconds) + " seconds"; 
              }
              var nowx = new Date(Date.now());
              var titu = timeSince(nowx - deal.time.getTime());
              var aDay = 24*60*60*1000;
               %>
               <a href=<%= `/deal/${deal._id}/postedBy/${deal.user}` %>>
                <div class="card">
                    <div class="card__face">
                        <div class="card__picture" data-pause="true" data-interval="1000">
                            <div class="discount" style="position: absolute; top: 2%; right:2%; color: #d10024; background: none; border: 1.8px solid #d10024; height: 2.8rem; font-size: 1.5rem; padding: 0 0.5rem">-70%</div>
                            <div class="carousel-item active">

                                <img src=<%= `/img/deals/${deal.titleImg}` %> alt="Deal Photo" class="deal-photo">

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
                                        <a class="aff_name" href=<%= `/member/${deal.user}` %>><span style="margin-right: 1rem;"><%= deal.owner %></span> | <i style="margin-left: 1rem;" class="fa fa-amazon"></i>
                                        </a>
                                    </div>

                                    <!-- <i class=" mp_aff-name-tag fas fa-check-circle"></i> -->

                                    <div class="monetory_values_mp">
                                        <li class="price"><span class="mp_price price_avail">₹<%= deal.mrp %> </span>
                                            <strike class="mp_p-mrp price_mrp">₹<%= deal.dealPrice %> </strike>
                                        <li style="font-weight: 400;">
                                        </li>
                                    </div>



                                    <div class="views_time_mp">
                                        <div style="display: inline-block">

                                            <% if (deal.views > 999) { %>
                                            <span><%=`${vui} views`%></span>
                                            <% } else { %>
                                            <span><%=`${deal.views} views`%></span>
                                            <% } %>

                                            <% if (tem > 24) { %>
                                            <span style="margin-left: 1rem;"><%=`${day} day(s) ago`%></span>
                                            <% } else if (tem > 1) { %>
                                            <span style="margin-left: 1rem;"><%=`${tem} hr ago`%></span>
                                            <% } else { %>
                                            <span style="margin-left: 1rem;"><%=`${tem*60} min ago`%></span>
                                            <% } %>

                                        </div>
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

            <% if (i === 8){break;}%>
            <% } %>
        </div>
    
        <% } %>



        <div id="showMoreT">
            <a href="#hidetrending" class="show-hide-link" id="more" onclick="trendMoreLess()">
                <i class="fas fa-caret-down font_icon" id="down" style="color: red;margin:0 1.2rem 0 1rem;"></i>
                <span class="heading-normal">See More</span>
            </a>
        </div>
        <div id="showLessT">
            <a href="#hidetrending" class="show-hide-link" id="more" onclick="trendMoreLess()">
                <i class="fas fa-caret-up font_icon" id="up" style="color: red;margin:0 1.2rem 0 1rem;"></i>
                <span class="heading-normal">Show Less</span>
            </a>
        </div>
        <% } %>
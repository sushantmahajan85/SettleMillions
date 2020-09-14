<!-- <% if (subs.length != 0 ) { %>
          <h3 class="heading-normal" style="margin: 1rem 0 0.5rem 1.8rem">
        SUBSCRIPTIONS
      </h3>
       <% var i = 0; %>
        
         
        
        <% for( var sub of user.subscribers) {
      %> <% i++; %> <% if (sub.subscribedUser) { %>

      <a  href=<%=`/member/${sub.subscribedUser._id} `%> >
        <div class="subscriptions_mp item2">
          <% if (sub.subscribedUser.photo) { %> <img
          src=<%=`/img/users/${sub.subscribedUser.photo}`%> alt="hi"
          class="social_icons" /> <% } else { %> <img
          data-name=<%=sub.subscribedUser.name %> data-color="#85e0ce"
          class="profile social_icons"/> <% } %>
          <h4 class="heading-normal" style="margin-top:0.2rem">
            <%= sub.subscribedUser.name %>
          </h4>
        </div>
      </a>

      <% } %> <% if (i === 5){break;}%> <% } %> 
      <div id="hide">
        <% var j = 0; %> <% for( var sub of user.subscribers ) { %> <% j++ %> <%
        if (j>5) { %>

        <div class="item2">
          <img src="/images/amazonOffer.jpeg" alt="hi" class="social_icons" />
          <h4 class="heading-normal" style="margin-top:0.5rem">
            <%= sub.subscribedUser.name %>
          </h4>
        </div>
        <% } %> <% } %>
      </div>
      
      
      <div id="showMore">
        <a
          href="#"
          class="w3-bar-item w3-button sidebar_link"
          style="border-bottom: 1px solid rgb(212, 211, 211);"
          id="more"
          onclick="read()"
        >
          <i
            class="fas fa-sort-down font_icon"
            id="down"
            style="color: red;margin:0 1.2rem 0 1rem;"
          ></i>
          <span class="heading-normal show_m"> Show More</span>
        </a>
      </div>

      <div id="showLess">
        <a
          href="#"
          class="w3-bar-item w3-button sidebar_link"
          style="border-bottom: 1px solid rgb(212, 211, 211);"
          id="more"
          onclick="read()"
        >
          <i
            class="fas fa-caret-up font_icon"
            id="up"
            style="color: red;margin: 0 1.2rem 0 1rem"
          ></i>
          <span class="heading-normal">Show Less</span>
        </a>
      </div>
          <% } else {%>
            <h1 class="heading-normal" style="margin: 1rem 0 0.5rem 1.8rem;">
              SUBSCRIPTIONS
            </h1>
              <h3 class="heading-normal" style="margin: 0 auto; border-bottom: 1px solid rgb(212,211,211); color: rgb(100, 96, 96); padding-left: 1rem;">You have not yet subscribed to any user</h3>
          <% } %> -->
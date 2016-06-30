<?php
// If logged in
if (is_user_logged_in()) {

	global $current_user;
	get_currentuserinfo();
}
?>

<div id="cu_nav">
	<a id="js-cu-off-canvas-nav-trigger" href="#" class="cu-off-canvas-nav-trigger" title="Menu">
		<img src="/wp-content/plugins/cu-wp-customization/img/omni-nav/mobile-header-menu.png" alt="Menu">
	</a>

	<a class="cu-logo" href="http://www.chapman.edu" title="Chapman.edu">
		<img src="/wp-content/plugins/cu-wp-customization/img/omni-nav/off-canvas-header-default.png" alt="Chapman.edu">
	</a>

	<div id="cu_login_container" class="cu_nav_menu">

		<div id="cu_identity">
			<?php if (is_user_logged_in()) : ?>
				<span class="circle-border">
					<?php echo get_avatar($current_user->user_email); ?>
				</span>
				<span class="cu_name"><?php echo $current_user->user_firstname; ?></span>
			<?php else : ?>
				<span class="circle-border">
					<svg viewbox="0 0 512 512"><use xlink:href="/wp-content/plugins/cu-wp-customization/omni-nav/omni-nav.svg#user" /></svg>
				</span>
				<span class="cu_name">Log In</span>
			<?php endif; ?>

		</div>

		<?php if (is_user_logged_in()) : ?>

		<div id="cu_logged_in" class="cu_dropdown_menu">
		    <?php echo get_avatar($current_user->user_email) ?>
		    <p class="label">Welcome</p>
		    <p class="cu_display_name boxfit"><?php echo $current_user->display_name; ?></p>
		    <a href="<?php echo get_home_url( 1, 'profile', (FORCE_SSL_ADMIN) ? 'https' : 'http' ); ?>">Edit Profile</a> |
		    <a href="<?php echo wp_logout_url('http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF']); ?>" id="cu_logout" title="Logout">Logout</a>
		</div>

		<?php else : ?>
		<div id="cu_login_form" class="cu_dropdown_menu">
			<form action="<?php echo (FORCE_SSL_LOGIN === true) ? home_url(null, 'https') : home_url(null, 'http'); ?>/wp-login.php" method="post">

				<label for="cu_username" style="display:none;">ChapmanU User ID</label>
				<input name="log" class="username" id="cu_username" type="text" value="ChapmanU User ID" onfocus="if (this.value == 'ChapmanU User ID') {this.value = '';}" onblur="if (this.value == '') {this.value = 'ChapmanU User ID';}" />

				<label for="cu_password" style="display:none;">Password</label>
				<input name="pwd" class="password" id="cu_password" type="password" value="Password" onfocus="if (this.value == 'Password') {this.value = '';}" onblur="if (this.value == '') {this.value = 'Password';}" />

				<input name="submit" type="submit" id="cu_submit" value="Log In" />

			    <input name="rememberme" class="persist" id="cu_persist" type="checkbox" value="forever" />
			    <label for="cu_persist">Remember Me </label>

			</form>
		</div>
		<?php endif; ?>

		<ul class="cu_dropdown_menu">
			<li><a class="cu_nav_button" href="https://blackboard.chapman.edu/"><svg viewbox="0 0 512 512"><use xlink:href="/wp-content/plugins/cu-wp-customization/omni-nav/omni-nav.svg#blackboard" /></svg>Blackboard</a></li>
			<li><a class="cu_nav_button" href="https://my.chapman.edu/"><svg viewbox="0 0 512 512"><use xlink:href="/wp-content/plugins/cu-wp-customization/omni-nav/omni-nav.svg#cu_window" /></svg>MyChapman</a></li>
			<li><a class="cu_nav_button" href="https://exchange.chapman.edu/"><svg viewbox="0 0 512 512"><use xlink:href="/wp-content/plugins/cu-wp-customization/omni-nav/omni-nav.svg#email" /></svg>Staff &amp; Faculty Email</a></li>
			<li><a class="cu_nav_button" href="http://panthermail.chapman.edu/"><svg viewbox="0 0 512 512"><use xlink:href="/wp-content/plugins/cu-wp-customization/omni-nav/omni-nav.svg#email" /></svg>PantherMail</a></li>
			<li><a class="cu_nav_button" href="https://mywindow.chapman.edu/"><svg viewbox="0 0 512 512"><use xlink:href="/wp-content/plugins/cu-wp-customization/omni-nav/omni-nav.svg#cu_window" /></svg>MyWindow</a></li>
		</ul>

	</div>

	<div id="js-cu-search-open-trigger" class="cu-search-open-trigger"><span>Search</span></div>

		<div id="cu_search" class="clearfix">

			<select class="search-type" name="search-type" id="search-type">
				<option value="All">All</option>
				<option value="Blog Stories">Blog Stories</option>
				<option value="Faculty Directory">Faculty Directory</option>
				<option value="Events">Events</option>
			</select>

			<div id="cu_search_box">

				<form action="//www.chapman.edu/search-results/index.aspx">
					<table cellspacing="0" cellpadding="0" class="gsc-search-box">
						<tbody>
							<tr>
								<td class="gsc-input">
									<input id="cu_search_no_js" autocomplete="off" type="text" size="10" class="gsc-input no-js" name="q" spellcheck="false" style="outline: none;" placeholder="Search">
									<label for="cu_search_no_js" style="display: none;">Search</label>
								</td>
								<td class="gsc-search-button">
									<input type="button" value="Search" class="gsc-search-button" title="search">
								</td>
								<td class="gsc-clear-button"><div class="gsc-clear-button" title="clear results">&nbsp;dfasdfsdf</div>
								</td>
							</tr>
						</tbody>
					</table>
				</form>

			</div>

			<div id="cu_search_results">
				<div id="cu_search_results_cell">
					<div id="cu_search_results_ui">

					</div>
				</div>
			</div>
		</div>

		<!-- Off Canvas Nav -->

		<div id="js-cu-off-canvas-overlay" class="cu-off-canvas-overlay"></div>

		<div id="js-cu-off-canvas-nav-container" class="cu-off-canvas-nav-container">

		    <div class="cu-off-canvas-header">
		    	<a href="#" title="Chapman University">
			        <img src="/wp-content/plugins/cu-wp-customization/img/omni-nav/off-canvas-header-default.png" alt="Chapman University">
			    </a>
		        <span id="js-cu-close-off-canvas-nav" class="close">X</span>
		        <div class="cu-off-canvas-links clearfix">
		            <span id="js-main-menu" class="main-menu">Main Menu</span>
		        </div>
		    </div>

		    <div id="js-cu-off-canvas-nav" class="cu-off-canvas-nav clearfix">

		        <ul class="level-1">

		            <li>
		                <a class="has-icon" href="http://www.chapman.edu/" title="The University"><svg viewbox="0 0 512 512"><use xlink:href="/wp-content/plugins/cu-wp-customization/omni-nav/omni-nav.svg#cu_window" /></svg>The University</a>
		                <span class="toggle"><span>+</span></span>
		                <ul>
		                	<li><a href="http://www.chapman.edu/about/index.aspx" title="About">About</a></li>
	                    <li><a href="http://www.chapman.edu/academics/index.aspx" title="Academics">Academics</a></li>
	                    <li><a href="http://www.chapman.edu/admission/index.aspx" title="Admission">Admission</a></li>
	                    <li><a href="http://www.chapman.edu/arts/index.aspx" title="Arts">Arts</a></li>
	                    <li><a href="http://www.chapman.edu/campus-life/index.aspx" title="Campus Life">Campus Life</a></li>
	                    <li><a href="http://www.chapman.edu/research-and-institutions/index.aspx" title="Research">Research</a></li>
	                    <li><a href="http://www.chapman.edu/support-chapman/index.aspx" title="Support">Support</a></li>
		                </ul>
		            </li>
		            <li>
		                <a class="has-icon" href="http://www.chapman.edu/audiences/index.aspx" title="Find information for..."><svg viewbox="0 0 512 512"><use xlink:href="/wp-content/plugins/cu-wp-customization/omni-nav/omni-nav.svg#user" /></svg>Find information for...</a>
		                <span class="toggle"><span>+</span></span>
		                <ul>
		                    <li><a href="http://www.chapman.edu/future-students/index.aspx" title="Prospective Students">Prospective Students</a></li>
		                    <li><a href="http://www.chapman.edu/students/index.aspx" title="Current Students">Current Students</a></li>
		                    <li><a href="http://www.chapman.edu/alumni/index.aspx" title="Alumni">Alumni</a></li>
		                    <li><a href="http://www.chapman.edu/faculty-staff/index.aspx" title="Faculty &amp; Staff">Faculty &amp; Staff</a></li>
		                    <li><a href="http://www.chapman.edu/families/index.aspx" title="Parents &amp; Families">Parents &amp; Families</a></li>
		                </ul>
		            </li>
		            <li>
		                <a class="has-icon icon-graduation" href="http://www.chapman.edu/academics/degrees-and-programs.aspx" title="Degrees &amp; Programs"><svg viewbox="0 0 512 512"><use xlink:href="/wp-content/plugins/cu-wp-customization/omni-nav/omni-nav.svg#graduation" /></svg>Degrees &amp; Programs</a>
		            </li>
		            <li>
		                <a class="has-icon" href="http://www.chapman.edu/academics/schools-colleges.aspx" title="Schools &amp; Colleges"><svg viewbox="0 0 512 512"><use xlink:href="/wp-content/plugins/cu-wp-customization/omni-nav/omni-nav.svg#building" /></svg>Schools &amp; Colleges</a>
		                <span class="toggle"><span>+</span></span>
		                <ul>
		                    <li><a href="http://www.chapman.edu/business/index.aspx" title="Argyros School of Business &amp; Economics">Argyros School of Business &amp; Economics</a></li>
		                    <li><a href="http://www.chapman.edu/ces/index.aspx" title="Crean College of Health &amp; Behavioral Sciences">Crean College of Health &amp; Behavioral Sciences</a></li>
		                    <li><a href="http://www.chapman.edu/copa/index.aspx" title="College of Educational Studies">College of Educational Studies</a></li>
		                    <li><a href="http://www.chapman.edu/crean/index.aspx" title="College of Performing Arts">College of Performing Arts</a></li>
		                    <li><a href="http://www.chapman.edu/dodge/index.aspx" title="Dodge College of Film &amp; Media Arts">Dodge College of Film &amp; Media Arts</a></li>
		                    <li><a href="http://www.chapman.edu/law/index.aspx" title="Fowler School of Law">Fowler School of Law</a></li>
		                    <li><a href="http://www.chapman.edu/scst/index.aspx" title="Schmid College of Science &amp; Technology">Schmid College of Science &amp; Technology</a></li>
		                    <li><a href="http://www.chapman.edu/communication/index.aspx" title="School of Communications">School of Communications</a></li>
		                    <li><a href="http://www.chapman.edu/pharmacy/index.aspx" title="School of Pharmacy">School of Pharmacy</a></li>
		                    <li><a href="http://www.chapman.edu/wilkinson/index.aspx" title="Wilkinson College of Arts, Humanities, &amp; Social Sciences">Wilkinson College of Arts, Humanities, &amp; Social Sciences</a></li>
		                </ul>
		            </li>
		            <li>
		                <a class="has-icon" href="http://events.chapman.edu/" title="Events"><svg viewbox="0 0 512 512"><use xlink:href="/wp-content/plugins/cu-wp-customization/omni-nav/omni-nav.svg#calendar" /></svg>Events</a>
		            </li>
		            <li>
		                <a class="has-icon" href="http://blogs.chapman.edu/" title="Blogs"><svg viewbox="0 0 512 512"><use xlink:href="/wp-content/plugins/cu-wp-customization/omni-nav/omni-nav.svg#newspaper" /></svg>Blogs</a>
		                <span class="toggle"><span>+</span></span>
		                <ul>
		                    <li>
	                            <a href="https://blogs.chapman.edu/business/" title="Argyros School of Business &amp; Economics">Argyros School of Business &amp; Economics</a>
	                        </li>
	                        <li>
	                            <a href="https://blogs.chapman.edu/collections" title="Art Collections at Chapman University">Art Collections at Chapman University</a>
	                        </li>
	                        <li>
	                            <a href="https://blogs.chapman.edu/alumni/" title="Chapman Alumni">Chapman Alumni</a>
	                        </li>
	                        <li>
	                            <a href="https://blogs.chapman.edu/magazine/" title="Chapman Magazine">Chapman Magazine</a>
	                        </li>
	                        <li>
	                            <a href="https://blogs.chapman.edu/ces/" title="College of Educational Studies">College of Educational Studies</a>
	                        </li>
	                        <li>
	                            <a href="https://blogs.chapman.edu/copa/" title="College of Performing Arts">College of Performing Arts</a>
	                        </li>
	                        <li>
	                            <a href="https://blogs.chapman.edu/crean/" title="Crean College of Health and Behavioral Sciences">Crean College of Health and Behavioral Sciences</a>
	                        </li>
	                        <li>
	                            <a href="https://blogs.chapman.edu/dodge/" title="Dodge College of Film and Media Arts">Dodge College of Film and Media Arts</a>
	                        </li>
	                        <li>
	                            <a href="https://blogs.chapman.edu/law/" title="Fowler School of Law">Fowler School of Law</a>
	                        </li>
	                        <li>
	                            <a href="https://blogs.chapman.edu/happenings/" title="Happenings">Happenings</a>
	                        </li>
	                        <li>
	                            <a href="https://blogs.chapman.edu/academics" title="Higher Ed and Technology: Academics at Chapman">Higher Ed and Technology: Academics at Chapman</a>
	                        </li>
	                        <li>
	                            <a href="https://blogs.chapman.edu/holocaust-education" title="Holocaust Education">Holocaust Education</a>
	                        </li>
	                        <li>
	                            <a href="https://blogs.chapman.edu/huell-howser-archives" title="Huell Howser Archives at Chapman University">Huell Howser Archives at Chapman University</a>
	                        </li>
	                        <li>
	                            <a href="https://blogs.chapman.edu/information-systems" title="Information Systems &amp; Technology">Information Systems &amp; Technology</a>
	                        </li>
	                        <li>
	                            <a href="http://blogs.chapman.edu/library" title="Leatherby Libraries">Leatherby Libraries</a>
	                        </li>
	                        <li>
	                            <a href="https://neighborsofchapman.com" title="Neighbors of Chapman">Neighbors of Chapman</a>
	                        </li>
	                        <li>
	                            <a href="https://blogs.chapman.edu/students/" title="One University">One University</a>
	                        </li>
	                        <li>
	                            <a href="https://blogs.chapman.edu/press-room" title="Press Room">Press Room</a>
	                        </li>
	                        <li>
	                            <a href="https://blogs.chapman.edu/scst/" title="Schmid College of Science and Technology">Schmid College of Science and Technology</a>
	                        </li>
	                        <li>
	                            <a href="https://blogs.chapman.edu/pharmacy/" title="School of Pharmacy">School of Pharmacy</a>
	                        </li>
	                        <li>
	                            <a href="https://blogs.chapman.edu/smc" title="Strategic Marketing and Communications">Strategic Marketing and Communications</a>
	                        </li>
	                        <li>
	                            <a href="https://blogs.chapman.edu/sustainability" title="Sustainability">Sustainability</a>
	                        </li>
	                        <li>
	                            <a href="http://blogs.chapman.edu/tpi" title="Thompson Policy Institute">Thompson Policy Institute</a>
	                        </li>
	                        <li>
	                            <a href="https://blogs.chapman.edu/wilkinson/" title="Wilkinson College of Arts, Humanities, and Social Sciences">Wilkinson College of Arts, Humanities, and Social Sciences</a>
	                        </li>
		                </ul>
		            </li>
		            <li>
		                <a class="has-icon" href="http://inside.chapman.edu/" title="Inside Chapman"><svg viewbox="0 0 512 512"><use xlink:href="/wp-content/plugins/cu-wp-customization/omni-nav/omni-nav.svg#cu_monogram" /></svg>Inside Chapman</a>
		            </li>
		            <li>
		                <a class="has-icon" href="http://social.chapman.edu/" title="Social"><svg viewbox="0 0 512 512"><use xlink:href="/wp-content/plugins/cu-wp-customization/omni-nav/omni-nav.svg#chat" /></svg>Social</a>
		            </li>

		        </ul>

		    </div>

		</div>

		<!-- End Off Canvas Nav -->

	</div>

<?php 
/*
 * Template Name: 友情链接模板
*/
get_header();
?>
<section class="section-profile-cover section-blog-cover section-shaped my-0 " <?php if( meowdata('banneron') ) {echo md_banner();} ?>>
      <div class="shape shape-style-1 shape-primary alpha-4">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="separator separator-bottom separator-skew" >
        <svg x="0" y="0" viewBox="0 0 2560 100" preserveAspectRatio="none">
          <polygon class="fill-white" points="2560 0 2560 100 0 100"></polygon>
        </svg>
      </div>
    </section> 
<main class="meowblog">	
<div class="main-container">
<div class="container">
<div class="row">
<div class="col-lg-10 col-md-10 ml-auto mr-auto">
<?php while (have_posts()) : the_post(); ?>
<div class="post-single">
                                          <div class="entry-header single-entry-header">
                                                <h2 class="entry-title wow swing  animated"><?php the_title(); ?></h2>
                                          </div>
                                           

                                          <div class="entry-content wow bounceInLeft"> 
										 <?php the_content(); ?>
										 <?php echo get_link_items(); ?>
										  </div>
                                    </div>
<?php endwhile;  ?>
<?php comments_template('', true); ?>
</div>	
</div>	
</div>	
</div>	
</main>	
<?php  get_footer(); ?>
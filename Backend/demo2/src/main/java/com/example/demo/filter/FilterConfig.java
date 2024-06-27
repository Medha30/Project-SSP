package com.example.demo.filter;

import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class FilterConfig {

    @Bean
    public FilterRegistrationBean<TokenFilter> loggingFilter() {
        FilterRegistrationBean<TokenFilter> registrationBean = new FilterRegistrationBean<>();
        registrationBean.setFilter(new TokenFilter());
        registrationBean.addUrlPatterns("/login/*");
        return registrationBean;
    }
}

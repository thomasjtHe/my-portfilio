import { Briefcase, Code, User } from 'lucide-react'
import React from 'react'

export const AboutSection = () => {
  return (
    <section id='about' className='py-24 px-4 relative min-h-screen'>
      {''}
      <div className='container mx-auto max-w-5xl'>
        <h2 className='text-3xl md:text-4xl font-bold text-center mb-12'>
          About <span className='text-primary'>Me</span>
        </h2>

        <div className='grid grid-cols-1 md:grid-cols-2 items-center gap-8'>
          <div className='space-y-6'>
            <h3 className='font-semibold text-2xl'>A <span className='text-primary'>Graduate Developer</span></h3>
            <p className='text-foreground'>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam, corporis magni ea labore fugiat suscipit commodi iure, sunt nostrum repudiandae harum dolorum veniam numquam! Modi facilis repellendus fuga nam dignissimos, sapiente exercitationem repudiandae voluptate nulla debitis illum totam non optio earum, in iste iure magni explicabo aut ipsum. Quos, mollitia?
            </p>
            <a href="src/assets/Jinting_He_Resume.pdf" className="pdf-link cosmic-button rounded-full border-primary hover:bg-primary/50 transition-colors duration-300" target="_blank">
            📄 My Resume
        </a>
          </div>
          <div className='grid grid-cols-1 gap-6 text-foreground'>
            <div className='gradient-border p-6 card-hover'>
              <div className='flex items-start gap-4'>
                <div className='p-3 rounded-full bg-primary/10 border-2 border-border'>
                <Code className='text-white'/>
                </div>
                <div className='text-left'>
                  <h4 className='text-lg font-semibold'>Skills</h4>
                  <p className='text-foreground/80'>JavaScript, React, Node.js, TypeScript, Python</p>
                </div>
              </div>
            </div>
            <div className='gradient-border p-6 card-hover'>
              <div className='flex items-start gap-4'>
                <div className='p-3 rounded-full bg-primary/10 border-2 border-border'>
                <User className='text-white'/>
                </div>
                <div className='text-left'>
                  <h4 className='text-lg font-semibold'>Focus</h4>
                  <p className='text-foreground/80'>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, voluptatibus?
                  </p>
                  </div>
              </div>
            </div>
            <div className='gradient-border p-6 card-hover' >
              <div className='flex items-start gap-4'>
                <div className='p-3 rounded-full bg-primary/10 border-2 border-border'>
                <Briefcase className='text-white'/>
                </div>
                <div className='text-left'>
                  <h4 className='text-lg font-semibold'>Experience</h4>
                  <p className='text-foreground/80'>
                  6 months internship at XYZ Company, 1 year freelance experience
                  </p>
                  </div>
              </div>
            </div>
          </div>
          
          
          
           
        </div>
        
      </div>
    </section>
  )
}

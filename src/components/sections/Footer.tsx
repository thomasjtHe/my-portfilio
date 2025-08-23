import { motion } from 'motion/react'
import { ArrowBigUp, Github } from 'lucide-react'

export const Footer = () => {
  return (
    <motion.footer
          className="relative mt-auto w-full overflow-hidden bg-background z-40"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative mx-auto px-6 py-6 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-6">
            <p className="text-lg text-muted-foreground select-none self-start sm:self-end">
              Copyright &copy; {new Date().getFullYear()} by Thomas He. All
              rights reserved.
            </p>
            <a
              href="#home"
              className="animate-bounce inline-flex items-center mr-[250px] gap-2 "
              aria-label="Back to top"
            >
              <ArrowBigUp className="h-6 w-6" />
              <span className="sr-only">Back to Top</span>
            </a>
            <a
              href="https://github.com/thomasjtHe/my-portfilio"
              target="_blank"
              className="text-lg text-muted-foreground select-none self-start sm:self-end"
            >
              Source: <Github className="inline h-6 w-6 ml-2" />
            </a>
          </div>
        </motion.footer>
  )
}

'use client';

import * as React from 'react';
import textareaVariants from './textAreaVariants';
import type { VariantProps } from 'class-variance-authority';
import cn from '../../utils';


// Define input size variants


function Textarea({
  className,
  variant,
  ...props
}: React.ComponentProps<'textarea'> & VariantProps<typeof textareaVariants>) {
  return <textarea data-slot="textarea" className={cn(textareaVariants({ variant }), className)} {...props} />;
}

export { Textarea};

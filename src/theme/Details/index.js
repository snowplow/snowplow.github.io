// Portions of this file are derived from Docusaurus.
// Licensed under the MIT License.
// Copyright (c) Facebook, Inc. and its affiliates.

import React from 'react'
import clsx from 'clsx'
import { Details as DetailsGeneric } from '@docusaurus/theme-common/Details'
import styles from './styles.module.css'
// Should we have a custom details/summary comp in Infima instead of reusing
// alert classes?
const InfimaClasses = 'alert alert--info'
export default function Details({ ...props }) {
  // Allows for a plain version of the details component, as the default has the `info` admonition background colour
  if (props.plain) {
    return <DetailsGeneric {...props} />
  }
  return (
    <DetailsGeneric
      {...props}
      className={clsx(InfimaClasses, styles.details, props.className)}
    />
  )
}

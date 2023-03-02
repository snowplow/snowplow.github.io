import React, { useState, useRef } from 'react'
import clsx from 'clsx'
import { ThemeClassNames } from '@docusaurus/theme-common'
import { useDoc } from '@docusaurus/theme-common/internal'
import LastUpdated from '@theme/LastUpdated'
import EditThisPage from '@theme/EditThisPage'
import TagsListInline from '@theme/TagsListInline'
import styles from './styles.module.css'
import { trackStructEvent } from '@snowplow/browser-tracker'

function TagsRow(props) {
  return (
    <div
      className={clsx(
        ThemeClassNames.docs.docFooterTagsRow,
        'row margin-bottom--sm'
      )}
    >
      <div className="col">
        <TagsListInline {...props} />
      </div>
    </div>
  )
}

function CommentBox({ handleSubmit, feedbackTextRef }) {
  const [textContent, setTextContent] = useState("Why wasn't it useful?")
  const [textareaClicked, setTextareaClicked] = useState(false)

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          ref={feedbackTextRef}
          value={textContent}
          onChange={(e) => setTextContent(e.target.value)}
          onClick={() => {
            if (textareaClicked === false) {
              setTextContent('')
              setTextareaClicked(true)
            }
          }}
          rows={4}
          cols={40}
        />
        <button type="submit">Send feedback</button>
      </form>
    </div>
  )
}

function Feedback() {
  const { permalink } = useDoc().metadata

  const [isTextboxVisible, setIsTextboxVisible] = useState(false)
  const [isThanksVisible, setIsThanksVisible] = useState(false)

  const feedbackTextRef = useRef()

  const handleLike = () => {
    setIsThanksVisible(true)
    setTimeout(() => {
      setIsThanksVisible(false)
    }, 1000)

    trackStructEvent({
      category: 'feedback',
      action: 'like',
      label: permalink,
    })
  }

  const handleDislike = () => {
    setIsTextboxVisible((current) => !current)
    setIsThanksVisible(false)

    trackStructEvent({
      category: 'feedback',
      action: 'dislike',
      label: permalink,
    })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('submitted')

    const text = feedbackTextRef.current.defaultValue
    console.log(text)

    trackStructEvent({
      category: 'feedback',
      action: 'comment',
      label: permalink,
      property: text,
    })

    setIsTextboxVisible((current) => !current)
    setIsThanksVisible(true)
    setTimeout(() => {
      setIsThanksVisible(false)
    }, 1000)
  }

  return (
    <div className="col margin-bottom--sm">
      Was this page useful?
      <div>
        <button onClick={handleLike}>Yes</button>
        <button onClick={handleDislike}>No</button>
      </div>
      {isTextboxVisible && (
        <CommentBox
          handleSubmit={handleSubmit}
          feedbackTextRef={feedbackTextRef}
        />
      )}
      {isThanksVisible && <div>Thanks for your feedback!</div>}
    </div>
  )
}

function EditMetaRow({
  editUrl,
  lastUpdatedAt,
  lastUpdatedBy,
  formattedLastUpdatedAt,
}) {
  return (
    <div className={clsx(ThemeClassNames.docs.docFooterEditMetaRow, 'row')}>
      <div className="col">{editUrl && <EditThisPage editUrl={editUrl} />}</div>

      <div className={clsx('col', styles.lastUpdated)}>
        {(lastUpdatedAt || lastUpdatedBy) && (
          <LastUpdated
            lastUpdatedAt={lastUpdatedAt}
            formattedLastUpdatedAt={formattedLastUpdatedAt}
            lastUpdatedBy={lastUpdatedBy}
          />
        )}
      </div>
    </div>
  )
}
export default function DocItemFooter() {
  const { metadata } = useDoc()
  const {
    editUrl,
    lastUpdatedAt,
    formattedLastUpdatedAt,
    lastUpdatedBy,
    tags,
  } = metadata
  const canDisplayTagsRow = tags.length > 0
  const canDisplayEditMetaRow = !!(editUrl || lastUpdatedAt || lastUpdatedBy)
  const canDisplayFooter = canDisplayTagsRow || canDisplayEditMetaRow
  if (!canDisplayFooter) {
    return null
  }
  return (
    <footer
      className={clsx(ThemeClassNames.docs.docFooter, 'docusaurus-mt-lg')}
    >
      <Feedback />
      {canDisplayTagsRow && <TagsRow tags={tags} />}
      {canDisplayEditMetaRow && (
        <EditMetaRow
          editUrl={editUrl}
          lastUpdatedAt={lastUpdatedAt}
          lastUpdatedBy={lastUpdatedBy}
          formattedLastUpdatedAt={formattedLastUpdatedAt}
        />
      )}
    </footer>
  )
}

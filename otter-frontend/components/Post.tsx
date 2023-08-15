import React from 'react'
import { 
    ArrowDownIcon, 
    ArrowUpIcon,
    BookmarkIcon,
    ArchiveBoxIcon,
    EllipsisHorizontalIcon,
    GiftIcon,
    ShareIcon
} from "@heroicons/react/24/outline";

type Props = {
    post: Post
}

function Post({ post } : Props) {
  return (
    <div>
        {/* Votes */}
        <div>
          <ArrowUpIcon />
          <ArrowDownIcon />
        </div>
        <div>
            {/* Header */}
            <div>

            </div>

            {/* Body */}

            {/* Image */}

            {/* Footer */}
            
        </div>
    </div>
  )
}

export default Post
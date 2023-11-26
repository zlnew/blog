<script setup lang="ts">
import { common, createLowlight } from 'lowlight'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { BubbleMenu as BubbleMenuExt } from '@tiptap/extension-bubble-menu'
import { FloatingMenu as FloatingMenuExt } from '@tiptap/extension-floating-menu'
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight'
import { StarterKit } from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { Figure } from '~/utils/figure'
import Iframe from '~/utils/iframe'

const props = defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits([
  'update:modelValue',
  'update:coverFigure'
])

const lowlight = createLowlight(common)

const editor = useEditor({
  editorProps: {
    attributes: {
      class: 'mx-auto focus:outline-none prose lg:prose-lg prose-code:before:content-none prose-code:after:content-none dark:prose-invert'
    }
  },
  extensions: [
    StarterKit.configure({
      codeBlock: false,
      horizontalRule: {
        HTMLAttributes: {
          class: 'dark:border-accent-light'
        }
      }
    }),
    Image,
    Figure,
    Iframe,
    Link,
    BubbleMenuExt,
    FloatingMenuExt,
    CodeBlockLowlight.configure({
      lowlight,
      HTMLAttributes: {
        class: 'bg-accent-light'
      }
    }),
    Placeholder.configure({
      placeholder: props.placeholder
    })
  ],
  onUpdate: () => {
    emit('update:modelValue', editor.value?.getHTML())
    emitCoverFigure()
  }
})

const isFigureModalOpen = ref(false)

function emitCoverFigure () {
  const content = editor.value?.getJSON().content?.[0]
  if (content?.type === 'figure') {
    emit('update:coverFigure', content)
  } else {
    emit('update:coverFigure', null)
  }
}

function insertFigure (attrs?: {
  title: string | undefined,
  alt: string | undefined,
  src: string,
  caption: string | undefined,
}) {
  try {
    if (attrs) {
      editor.value?.chain().focus().setFigure({
        title: attrs.title,
        alt: attrs.alt,
        src: attrs.src,
        caption: attrs.caption
      }).run()
    }
  } catch (e: any) {
    useToast().add({
      title: 'Error while inserting figure',
      description: e.message,
      color: 'red'
    })
  }
}

function addIframe () {
  const url = window.prompt('URL')

  if (url) {
    editor.value?.chain().focus().setIframe({ src: url }).run()
  }
}

function setLink () {
  const previousUrl = editor.value?.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)

  if (url === null) {
    return
  }

  if (url === '') {
    editor.value?.chain()
      .focus()
      .extendMarkRange('link')
      .unsetLink()
      .run()

    return
  }

  editor.value?.chain()
    .focus()
    .extendMarkRange('link')
    .setLink({ href: url })
    .run()
}

watch(() => props.modelValue, (newValue) => {
  const isSame = editor.value?.getHTML() === newValue

  if (isSame) { return }

  if (newValue) {
    editor.value?.commands.setContent(props.modelValue, false)
  }
})
</script>

<template>
  <div class="space-y-4">
    <ContentFloatingMenu
      :editor="editor"
      @open-figure-modal="isFigureModalOpen = true"
      @set-iframe="addIframe"
    />
    <LazyContentBubbleMenu
      :editor="editor"
      @set-link="setLink"
    />
    <EditorContent :editor="editor" spellcheck="false" />
  </div>

  <LazyContentFigureModal
    v-model="isFigureModalOpen"
    @update:attrs="insertFigure"
  />
</template>

<style>
.tiptap p.is-editor-empty:first-child::before {
  color: #adb5bd;
  content: attr(data-placeholder);
  float: left;
  height: 0;
  pointer-events: none;
}

.iframe-wrapper iframe {
  height: 300px;
  width: 100%;
}
</style>

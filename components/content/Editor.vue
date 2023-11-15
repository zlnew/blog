<script setup lang="ts">
import { Placeholder } from '@tiptap/extension-placeholder'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { BubbleMenu as BubbleMenuExt } from '@tiptap/extension-bubble-menu'
import { FloatingMenu as FloatingMenuExt } from '@tiptap/extension-floating-menu'
import { StarterKit } from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import { Figure } from '~/utils/figure'

const props = defineProps<{
  modelValue: string
  placeholder?: string
}>()

const emit = defineEmits([
  'update:modelValue',
  'update:coverFigure'
])

const editor = useEditor({
  editorProps: {
    attributes: {
      class: 'prose dark:prose-invert prose-headings:tracking-tighter prose-img:mb-0 prose-img:focus:outline prose-img:focus:outline-offset-2 prose-img:focus:outline-green-600 prose-hr:dark:border-accent-light mx-auto focus:outline-none dark:bg-transparent dark:border-accent-light'
    }
  },
  extensions: [
    StarterKit,
    Image,
    Figure,
    Link,
    BubbleMenuExt,
    FloatingMenuExt,
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
</style>

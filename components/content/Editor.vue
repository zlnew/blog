<script setup lang="ts">
import { Placeholder } from '@tiptap/extension-placeholder'
import { Image } from '@tiptap/extension-image'
import { StarterKit } from '@tiptap/starter-kit'
import { useEditor, EditorContent } from '@tiptap/vue-3'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits(['update:modelValue'])

const editor = useEditor({
  editorProps: {
    attributes: {
      class: 'prose focus:outline-none dark:prose-invert mx-auto px-2'
    }
  },
  extensions: [
    StarterKit,
    Image,
    Placeholder.configure({
      placeholder: 'Write here ...'
    })
  ],
  onUpdate: () => {
    emit('update:modelValue', editor.value?.getHTML())
  }
})

const isImageUploaderOpen = ref(false)

function insertImage (url: string) {
  editor.value?.chain().focus().setImage({
    src: url
  }).run()
}

watch(() => props.modelValue, (newValue) => {
  newValue && editor.value?.commands.setContent(newValue, false)
})
</script>

<template>
  <div class="space-y-8">
    <div
      v-if="editor"
      class="
        sticky top-[5.6rem] z-50 p-2 rounded-md
        bg-white/90 dark:bg-accent-light/90
        border dark:border-accent-light
        flex flex-wrap gap-2 prose prose-sm sm:prose dark:prose-invert mx-auto
      "
    >
      <UTooltip text="Bold">
        <UButton
          icon="i-material-symbols-format-bold"
          color="black"
          :variant="editor.isActive('bold') ? 'solid' : 'outline'"
          :disabled="!editor.can().chain().focus().toggleBold().run()"
          class="rounded-sm"
          @click="editor.chain().focus().toggleBold().run()"
        />
      </UTooltip>

      <UTooltip text="Italic">
        <UButton
          icon="i-material-symbols-format-italic"
          color="black"
          :variant="editor.isActive('italic') ? 'solid' : 'outline'"
          :disabled="!editor.can().chain().focus().toggleItalic().run()"
          class="rounded-sm"
          @click="editor.chain().focus().toggleItalic().run()"
        />
      </UTooltip>

      <UTooltip text="Strike">
        <UButton
          icon="i-material-symbols-format-strikethrough"
          color="black"
          :variant="editor.isActive('strike') ? 'solid' : 'outline'"
          :disabled="!editor.can().chain().focus().toggleStrike().run()"
          class="rounded-sm"
          @click="editor.chain().focus().toggleStrike().run()"
        />
      </UTooltip>

      <UTooltip text="Code">
        <UButton
          icon="i-material-symbols-code"
          color="black"
          :variant="editor.isActive('code') ? 'solid' : 'outline'"
          :disabled="!editor.can().chain().focus().toggleCode().run()"
          class="rounded-sm"
          @click="editor.chain().focus().toggleCode().run()"
        />
      </UTooltip>

      <UTooltip text="Paragraph">
        <UButton
          icon="i-material-symbols-format-paragraph"
          color="black"
          :variant="editor.isActive('paragraph') ? 'solid' : 'outline'"
          :disabled="!editor.can().chain().focus().setParagraph().run()"
          class="rounded-sm"
          @click="editor.chain().focus().setParagraph().run()"
        />
      </UTooltip>

      <UTooltip text="Heading 1">
        <UButton
          icon="i-material-symbols-format-h1"
          color="black"
          :variant="editor.isActive('heading', { level: 1 }) ? 'solid' : 'outline'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        />
      </UTooltip>

      <UTooltip text="Heading 2">
        <UButton
          icon="i-material-symbols-format-h2"
          color="black"
          :variant="editor.isActive('heading', { level: 2 }) ? 'solid' : 'outline'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        />
      </UTooltip>

      <UTooltip text="Heading 3">
        <UButton
          icon="i-material-symbols-format-h3"
          color="black"
          :variant="editor.isActive('heading', { level: 3 }) ? 'solid' : 'outline'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        />
      </UTooltip>

      <UTooltip text="Heading 4">
        <UButton
          icon="i-material-symbols-format-h4"
          color="black"
          :variant="editor.isActive('heading', { level: 4 }) ? 'solid' : 'outline'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
        />
      </UTooltip>

      <UTooltip text="Heading 5">
        <UButton
          icon="i-material-symbols-format-h5"
          color="black"
          :variant="editor.isActive('heading', { level: 5 }) ? 'solid' : 'outline'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
        />
      </UTooltip>

      <UTooltip text="Heading 6">
        <UButton
          icon="i-material-symbols-format-h6"
          color="black"
          :variant="editor.isActive('heading', { level: 6 }) ? 'solid' : 'outline'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
        />
      </UTooltip>

      <UTooltip text="Bulleted list">
        <UButton
          icon="i-material-symbols-format-list-bulleted"
          color="black"
          :variant="editor.isActive('bulletList') ? 'solid' : 'outline'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleBulletList().run()"
        />
      </UTooltip>

      <UTooltip text="Numbered list">
        <UButton
          icon="i-material-symbols-format-list-numbered"
          color="black"
          :variant="editor.isActive('orderedList') ? 'solid' : 'outline'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleOrderedList().run()"
        />
      </UTooltip>

      <UTooltip text="Code blocks">
        <UButton
          icon="i-material-symbols-code-blocks"
          color="black"
          :variant="editor.isActive('codeBlock') ? 'solid' : 'outline'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleCodeBlock().run()"
        />
      </UTooltip>

      <UTooltip text="Quote">
        <UButton
          icon="i-material-symbols-format-quote"
          color="black"
          :variant="editor.isActive('blockquote') ? 'solid' : 'outline'"
          class="rounded-sm"
          @click="editor.chain().focus().toggleBlockquote().run()"
        />
      </UTooltip>

      <UTooltip text="Horizontal rule">
        <UButton
          icon="i-material-symbols-horizontal-rule"
          color="black"
          variant="outline"
          class="rounded-sm"
          @click="editor.chain().focus().setHorizontalRule().run()"
        />
      </UTooltip>

      <UTooltip text="Page break">
        <UButton
          icon="i-material-symbols-insert-page-break"
          color="black"
          variant="outline"
          class="rounded-sm"
          @click="editor.chain().focus().setHardBreak().run()"
        />
      </UTooltip>

      <UTooltip text="Insert image">
        <UButton
          icon="i-material-symbols-imagesmode-outline"
          color="black"
          variant="outline"
          class="rounded-sm"
          @click="isImageUploaderOpen = true"
        />

        <!-- <input
          ref="imageUploader"
          type="file"
          name="image"
          class="hidden"
          @change="imageChangedHandler"
        > -->
      </UTooltip>

      <UTooltip text="Undo">
        <UButton
          icon="i-material-symbols-undo"
          color="black"
          variant="outline"
          :disabled="!editor.can().chain().focus().undo().run()"
          class="rounded-sm"
          @click="editor.chain().focus().undo().run()"
        />
      </UTooltip>

      <UTooltip text="Redo">
        <UButton
          icon="i-material-symbols-redo"
          color="black"
          variant="outline"
          :disabled="!editor.can().chain().focus().redo().run()"
          class="rounded-sm"
          @click="editor.chain().focus().redo().run()"
        />
      </UTooltip>
    </div>

    <EditorContent :editor="editor" spellcheck="false" />
  </div>

  <LazyContentImageUploaderModal
    v-model="isImageUploaderOpen"
    @update:url="insertImage"
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
